const controller = require('../controllers/Exercise');
const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, controller.getExercises);
router.get('/:id', verifyToken, controller.getExerciseById);
router.post('/', verifyToken, controller.createExercise);
router.put('/:id', verifyToken, controller.modifyExercise);
router.delete('/:id', verifyToken, controller.deleteExercise);

module.exports = router;