const Finance = require('../models/finance');

module.exports = {
 newFinance: async (req, res) => {
  const {
   body: {
    finance_name,
    finance_email,
    document_password,

   },
  } = req;

  console.log(req)

  try {

    const existingFinance = await Finance.findOne();

    if (existingFinance) {
      existingFinance.finance_name = finance_name;
      existingFinance.finance_email = finance_email;
      existingFinance.document_password = finance_email_password;
      
    await existingFinance.save();
    console.log(existingFinance);
    res.status(200).json(existingFinance);
  } else {

    const financeData = await Finance.create({
      finance_name,
      finance_email,
      document_password,
    });
   console.log(financeData)
    res.status(200).json(financeData);
  }
   
   } catch (err) {
    res.status(500).json({ error: 'Internal Server Error in Controller' });
   }
 },
};
