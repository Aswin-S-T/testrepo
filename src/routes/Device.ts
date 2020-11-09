import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import {
    listDevice, addDevice, updateDevice,
    deleteDevice, getDeviceDetails,
    getDeviceErrors, getDeviceStatistics,
    getDeviceIds, processDeviceData,
    getLiveData, getStatistics,
    getRawData
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
router.get('/sensor/livedata', getLiveData);
router.get('/sensor/statistics', getStatistics);
router.get('/sensor/rawdata', getRawData);
export default router;
