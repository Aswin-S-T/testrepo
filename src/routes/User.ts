import { Router } from 'express';
import { validate } from '../middlewares/Validation';
import {
    usersList, addUser,
    editUser, updateUserDetails,
    getUserDetails, updateUserPassword,
    getUserDetailsById, getUserIds
} from '@controllers';
import { auth } from '../middlewares/Auth';

const router = Router();
router.get('/', auth('Administrator', 'Supervisor', 'Operator', 'Super Admin'), usersList);
router.post('/', auth('Administrator', 'Supervisor', 'Operator', 'Super Admin'), validate.userAdd, addUser);
router.put('/me', auth('Administrator', 'Supervisor', 'Operator', 'Super Admin'), updateUserDetails);
router.get('/ids', auth('Administrator', 'Super Admin'), getUserIds);
router.put('/me/password', auth('Administrator', 'Supervisor', 'Operator', 'Super Admin'), validate.updateUserPassword, updateUserPassword);
router.get('/me', auth('Administrator', 'Supervisor', 'Operator', 'Super Admin'), getUserDetails);
router.get('/:id', auth('Administrator', 'Super Admin'), getUserDetailsById);
router.put('/:id', auth('Administrator', 'Super Admin'), editUser);
export default router;