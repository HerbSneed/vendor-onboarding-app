const router = require('express').Router();
const HomepageController = require('../../controllers/page/HomepageController');

router.get('/', HomepageController.getFinanceUpdatedPage);

module.exports = router;