const Router = require("express");
const router = Router();

const authController = require('../controllers/auth.controller');

router.post('/login', authController.doLogin);
router.post('/register', authController.doLogin)

module.exports = router;