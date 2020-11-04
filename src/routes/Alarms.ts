import { Router } from "express";
import { getActiveAlarms } from '@controllers';

const router = Router();

router.get('/', getActiveAlarms);

export default router;