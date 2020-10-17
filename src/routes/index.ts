import { Router } from 'express';

import AuthRoute from './Auth';
import UserRoute from './User';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRoute);
router.use('/user', UserRoute);

// Export the base-router
export default router;