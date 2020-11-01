import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import {
    listDevice, addDevice, updateDevice,
    deleteDevice, getDeviceDetails, 
    getDeviceErrors, getDeviceStatistics,
    getDeviceIds
} from '@controllers';

const router = Router();

router.post('/', addDevice);
router.get('/', listDevice);
router.get('/ids', getDeviceIds);
router.get('/statistics', getDeviceStatistics);
router.get('/:id', getDeviceDetails);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);
router.get('/errors/:id', getDeviceErrors);
export default router;
