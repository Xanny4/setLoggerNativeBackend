const controller = require('../controllers/User');
const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, controller.getUser);
router.post('/authenticate', cacheNoStore, controller.authenticate);
router.post('/confirmPassword', verifyToken, controller.confirmPassword);
router.post('/', cacheNoStore, controller.createUser);
router.put('/', verifyToken, controller.modifyUser);

module.exports = router;