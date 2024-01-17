const router = require('express').Router();

const adminRoute = require('./adminRoute');
const applicationRoute = require('./applicationRoute');

router.use('/admin', adminRoute);
router.use('/application', applicationRoute);

module.exports = router;
