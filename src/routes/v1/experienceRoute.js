const router = require('express').Router();
const experienceController = require('../../controllers/experienceController');

router
	.route('/')
	.get(experienceController.index)
	.post(experienceController.store);

router
	.route('/:id')
	.put(experienceController.update)
	.delete(experienceController.delete);

module.exports = router;
