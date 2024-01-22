const router = require('express').Router();
const experienceController = require('../../controllers/experienceController');
const authMiddleware = require('../../middlewares/authMiddleware');

router
	.route('/')
	.get(authMiddleware, experienceController.index)
	.post(authMiddleware, experienceController.store);

router
	.route('/:id')
	.put(authMiddleware, experienceController.update)
	.delete(authMiddleware, experienceController.delete);

module.exports = router;
