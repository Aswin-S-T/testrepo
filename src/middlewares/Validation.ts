import { check } from 'express-validator';

export const validate = {
    login: [
        check('username', "Username doesn't exists").exists(),
        check('password').exists()
    ],
    register: [
        check('email', "Email doesn't exists").exists(),
        check('name', "Name doesn't exists").exists(),
        check('password').exists()
    ],
    userAdd: [
        check('email', "Email doesn't exists").exists(),
        check('name', "Name doesn't exists").exists(),
        check('password').exists()
    ],
    updateUserPassword: [
        check('current_password').exists(),
        check('confirm_password').exists(),
        check('password').exists()
    ],
    apikeyAdd: [
        check('name', "Name doesn't exists").exists(),
        check('limit', "Limit doesn't exists").exists(),
    ],
}