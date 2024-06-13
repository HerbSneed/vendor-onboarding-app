module.exports = {
  getHomepage: async (req, res) => {
      res.render('homepage')
  },
  getSubmittedPage: async (req, res) => {
      res.render('submitted')
  },
  getLandingPage: async (req, res) => {
    res.render('landing')
  },
  getFinanceUpdatedPage: async (req,res) => { 
    res.render('financeUpdated')
  } 
};
