import { Router } from 'express';

import AuthRoute from './Auth';
import UserRoute from './User';
import ApiKeyRoute from './ApiKey';
import DeviceRoute from './Device'
import OrganizationRoute from './Organization';
import AlarmRoute from './AlarmRule';
import AlertRoute from './Alarms';
import SensorRoute from './Sensors';
import DashboardRoute from './Dashboard';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/apikey', ApiKeyRoute);
router.use('/device', DeviceRoute)
router.use('/organization', OrganizationRoute);
router.use('/alarmrule', AlarmRoute);
router.use('/alarm', AlertRoute);
router.use('/sensor', SensorRoute);
router.use('/dashboard', DashboardRoute)

// Export the base-router
export default router;