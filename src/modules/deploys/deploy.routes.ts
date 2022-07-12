import { Router } from 'express';
import { createError, success } from '../common/utils';
import { DeployService } from './deploy.service';

const router = Router();

router.get('/:repoId', async (req, res, next) => {
	try {
		const {
			params: { repoId }
		} = req;
		const deploys = await new DeployService().getAll(repoId);
		res.json(success('Retrieved deploys', deploys));
	} catch (e) {
		next(e);
	}
});

router.post('/:repoId/:deployId', async (req, res, next) => {
	try {
		const {
			query: { logs },
			params: { deployId }
		} = req;

		const deployService = new DeployService().getById(deployId, !!logs);
		if (!deployService) throw createError('Deploy not found', 404);

		return res.json(success('Deploy Retireve', deployService));
	} catch (e) {
		next(e);
	}
});

export default router;
