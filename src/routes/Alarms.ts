import { Router } from "express";
import { getActiveAlarms, updateAlert } from '@controllers';

const router = Router();

router.get('/', getActiveAlarms);
router.put('/:id', updateAlert);

export default router;