import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import { addApiKey, updateApiKey, listApiKey, getApiKeyDetails, deleteApiKey } from '@controllers';

const router = Router();

router.post('/', auth('Super Admin'), validate.apikeyAdd, addApiKey);
router.get('/', auth('Super Admin'), listApiKey);
router.get('/:id', auth('Super Admin'), getApiKeyDetails);
router.put('/:id', auth('Super Admin'), updateApiKey);
router.delete('/:id', auth('Super Admin'), deleteApiKey);
export default router;