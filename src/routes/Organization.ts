import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import { auth } from '../middlewares/Auth';
import {
    listOrganization, addOrganization, updateOrganization,
    deleteOrganization, getOrganizationDetails

} from '@controllers';

const router = Router();

router.post('/', addOrganization);
router.get('/', listOrganization);
router.get('/:id', getOrganizationDetails);
router.put('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);
export default router;