const router = require('express').Router();
const applicationController = require('../../controllers/applicationController');
const { validateBody } = require('../../utils/validator');
const { applicationSchema } = require('../../schemas/schema');
const authMiddleware = require('../../middlewares/authMiddleware');

router
	.route('/')
	.get(authMiddleware, applicationController.index)
	.post(
		validateBody(applicationSchema.store),
		authMiddleware,
		applicationController.store
	);
router
	.route('/:id')
	.get(authMiddleware, applicationController.show)
	.put(authMiddleware, applicationController.update)
	.post(authMiddleware, applicationController.delete);

router.route('/:id/image').post(authMiddleware, applicationController.upload);

module.exports = router;
