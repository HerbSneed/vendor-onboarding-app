const router = require('express').Router();
const vendorRoutes = require('./vendor-routes');
const financeRoutes = require('./finance-routes');

router.use('/vendor', vendorRoutes);
router.use('/finance', financeRoutes);

module.exports = router;