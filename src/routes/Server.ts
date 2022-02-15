import { Router } from 'express';

import { getServerPreferences } from 'src/controllers/ServerController';

const router = Router();
router.get('/preferences', getServerPreferences);

export default router;