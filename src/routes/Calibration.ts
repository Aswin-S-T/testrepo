import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import { addCalibCert, listCalibCert } from 'src/controllers/CalibrationController';
import { uploadDiskStorage } from '@utils'

const router = Router();
router.post('/', uploadDiskStorage.single('calibration-cert'), addCalibCert);
router.get('/', auth('Admin', 'Supervisor', 'Operator', 'Super Admin'), listCalibCert);
export default router;