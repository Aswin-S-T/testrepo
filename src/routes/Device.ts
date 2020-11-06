import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import {
    listDevice, addDevice, updateDevice,
    deleteDevice, getDeviceDetails,
    getDeviceErrors, getDeviceStatistics,
    getDeviceIds, processDeviceData
} from '@controllers';

const router = Router();

router.post('/', addDevice);
router.get('/', auth('Administrator', 'Supervisor', 'Operator', 'Super Admin'), listDevice);
router.get('/ids', getDeviceIds);
router.get('/statistics', auth('Administrator', 'Supervisor', 'Operator', 'Super Admin'), getDeviceStatistics);
router.get('/errors', getDeviceErrors);
router.get('/:id', getDeviceDetails);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

router.post('/sensor/livedata', processDeviceData);
export default router;
