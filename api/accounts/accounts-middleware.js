const Accounts = require('./accounts-model');


const checkAccountPayload = (req, res, next) => { 
  const { name, budget } = req.body
  if (name == undefined || !('budget' in req.body)) { //which was is best to check if name/budget are in the req.body
    res.status(400).json({ 
      message: 'name and budget are required' 
    });
  } else if (typeof name !== 'string') {
    res.status(400).json({ 
      message: 'name of account must be a string' 
    });
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ 
      message: 'name of account must be be between 3 and 100' 
    });
  } else if (typeof budget !== 'number' || isNaN(budget)) { // understand isNAN(budget)
    res.status(400).json({ 
      message: 'budget of account must be a number' 
    });
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ 
      message: "budget of account is too large or too small" 
    })
  } else {
    req.account = { name: req.body.name.trim(), budget: req.body.budget }
    next()
  }
}

const checkAccountNameUnique = (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      if (accounts.filter(account => account.name == req.body.name).length > 0) {
        res.status(400).json({ 
          message: 'that name is taken'
        })
      } else {
        next()
      }
    })
    // you could also do another db here or create a new model for it. Searching the database for any names that match the req body name
}

const checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      if (!account) {
        res.status(404).json({
          message: 'Account not found'
        })
      } else {
        req.account = account
        next()
      }
    })
    .catch(next);
}

module.exports = {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
}
