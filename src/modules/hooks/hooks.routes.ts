import { Router } from 'express';
import { exec } from 'child_process';
import RepoService from '../repos/repo.service';
import { DeployService } from '../deploys/deploy.service';
import { createError, verifyWebhook } from '../common/utils';

const router = Router();

router.use(verifyWebhook);

router.post('/:repoId', async (req, res, next) => {
	try {
		const {
			body: {
				repository: { name }
			},
			params: { repoId }
		} = req;

		const repoService = new RepoService();
		const deployService = new DeployService();

		const repo = await repoService.getById(repoId);

		if (!repo) throw createError('Repo not found', 404);
		if (repo.name !== name) throw createError('Repo name mismatch', 400);

		let log = 'New Deployment started on ' + new Date().toLocaleString();

		const deploy = await deployService.create({
			log,
			repoId,
			version: '1.0.0',
			status: 'running'
		});

		const proc = exec(`cd ${repo.path} && git pull && ${repo.deployCommands}`);

		proc?.stdout?.on('data', data => {
			log += data.toString();
		});

		proc?.stderr?.on('data', data => {
			log += data.toString();
		});

		proc?.on('close', async code => {
			if (code !== 0) {
				log += `\n\nCommand exited with code ${code}`;
			} else {
				log += `\n\nCommand executed successfully with code ${code}`;
			}

			await repoService.update(repoId, {
				...repo,
				lastDeploy: new Date().toISOString()
			});

			await deployService.update(deploy.id, {
				...deploy,
				log
			});
		});

		console.log(`Repo ${name} pushed`);
		res.sendStatus(200);
	} catch (e) {
		return next(e);
	}
});

export default router;
