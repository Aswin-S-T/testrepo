import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import { addWebhook, listWebhook, deleteWebhook } from '../controllers/WebhookController'

const router = Router();
router.post('/', auth('Super Admin', 'Admin'), addWebhook);
router.get('/', auth('Super Admin', 'Admin', 'Supervisor'), listWebhook);
router.delete('/:id', auth('Super Admin'), deleteWebhook)

export default router;