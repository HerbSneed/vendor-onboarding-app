const Finance = require('../models/finance');

module.exports = {
 newFinance: async (req, res) => {
  const {
   body: {
    finance_email,
   },
  } = req;

  try {

    const existingFinance = await Finance.findOne();

    if (existingFinance) {
     existingFinance.finance_email = finance_email;
      
    await existingFinance.save();
    res.status(200).json(existingFinance);
  } else {

    const financeData = await Finance.create({
      finance_email,
    });
    res.status(200).json(financeData);
  }
   
   } catch (err) {
    res.status(500).json({ error: 'Internal Server Error in Controller' });
   }
 },
};
