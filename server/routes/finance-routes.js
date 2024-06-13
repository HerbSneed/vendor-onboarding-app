const router = require('express').Router();
const FinanceController = require('../controllers/FinanceController');

router.post('/', FinanceController.newFinance);

module.exports = router;