import { Router } from 'express';
import repos from './repos/repo.routes';
import hooks from './hooks/hooks.routes';
import deploys from './deploys/deploy.routes';

const router = Router();

router.use('/hooks', hooks);
router.use('/repos', repos);
router.use('/deploys', deploys);

export default router;
