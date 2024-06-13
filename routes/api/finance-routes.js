const router = require('express').Router();
const FinanceController = require('../../controllers/api/FinanceController');

router.post('/', FinanceController.newFinance);

module.exports = router;