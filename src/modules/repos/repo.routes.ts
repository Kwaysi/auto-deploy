import { Router } from 'express';
import { success } from '../common/utils';
import RepoService from './repo.service';

const router = Router();

router.post('/', async (req, res, next) => {
	try {
		const {
			body: { name, path, deployCommands }
		} = req;

		const repoService = await new RepoService()
			.create({
				name,
				path,
				deployCommands,
				version: '1.0.0',
				lastDeploy: new Date().toISOString()
			})
			.catch(e => {
				throw e;
			});

		return res.json(success('Repo created', repoService));
	} catch (e) {
		return next(e);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const repoService = await new RepoService().getAll();

		return res.json(success('Repos fetched', repoService));
	} catch (e) {
		return next(e);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { id } = req.params;

		const repoService = await new RepoService().getById(id);

		return res.json(success('Repo fetched', repoService));
	} catch (e) {
		return next(e);
	}
});

export default router;
