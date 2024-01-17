const router = require('express').Router();
const applicationController = require('../../controllers/applicationController');

router
	.route('/')
	.get(applicationController.index)
	.post(applicationController.store);
router
	.route('/:id')
	.get(applicationController.show)
	.put(applicationController.update)
	.delete(applicationController.delete);

module.exports = router;
