import { Router } from 'express';

import AuthRoute from './Auth';
import UserRoute from './User';
import ApiKeyRoute from './ApiKey';
import DeviceRoute from './Device'
import OrganizationRoute from './Organization';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/apikey', ApiKeyRoute);
router.use('/device', DeviceRoute)
router.use('/organization', OrganizationRoute)
// Export the base-router
export default router;