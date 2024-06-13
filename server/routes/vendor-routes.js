const router = require('express').Router();
const VendorController = require('../controllers/VendorController');

router.post('/', VendorController.newVendor);

module.exports = router;

