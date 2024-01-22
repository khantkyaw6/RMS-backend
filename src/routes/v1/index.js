const router = require('express').Router();
const authRoute = require('./authRoute');
const adminRoute = require('./adminRoute');
const applicationRoute = require('./applicationRoute');
const experienceRoute = require('./experienceRoute');

router.use('/admin', adminRoute);
router.use('/auth', authRoute);
router.use('/application', applicationRoute);
router.use('/experience', experienceRoute);

module.exports = router;
