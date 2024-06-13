const router = require('express').Router();
const homeRoutes = require('./home-routes');
const formSubmittedRoutes = require('./formSubmitted-route');
const landingRoutes = require('./landing-route');
const financeUpdatedRoute = require('./financeUpdated-route');


router.use('/', landingRoutes);
router.use('/submitted', formSubmittedRoutes);
router.use('/signup', homeRoutes);
router.use('/financeUpdated', financeUpdatedRoute);


module.exports = router;