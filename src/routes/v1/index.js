const router = require('express').Router();
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');
const applicationRoute = require('./applicationRoute');

router.use('/admin', adminRoute);
router.use('/auth', authRoute);
router.use('/application', applicationRoute);

module.exports = router;
