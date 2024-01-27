const router = require('express').Router();
const {login , register , me} = require('../controller/userController')
const registerValidation = require('../middleware/registerValidation');
const { tokenControll } = require('../middleware/token');

router.post('/login' , registerValidation.userLogin, login)
router.post('/register' , registerValidation.userRegister , register)
router.get('/me' , tokenControll ,  me)

module.exports = router