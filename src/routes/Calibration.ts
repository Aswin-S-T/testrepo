import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import { addCalibCert, listCalibCert } from 'src/controllers/CalibrationController';

const router = Router();
router.post('/', addCalibCert);
router.get('/',auth('Admin', 'Supervisor', 'Operator', 'Super Admin'),listCalibCert);
export default router;