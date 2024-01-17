const router = require('express').Router();
const adminController = require('../../controllers/adminController');

router.route('/').get(adminController.index).post(adminController.store);

router
	.route('/:id')
	.get(adminController.show)
	.put(adminController.update)
	.delete(adminController.delete);

module.exports = router;
