import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import {
    listDevice, addDevice, updateDevice,
    deleteDevice, getDeviceDetails

} from '@controllers';

const router = Router();

router.post('/', addDevice);
router.get('/', listDevice);
router.get('/statistics');
router.get('/:id', getDeviceDetails);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);
export default router;
