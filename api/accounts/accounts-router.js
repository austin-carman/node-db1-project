const router = require('express').Router()
const Accounts = require('./accounts-model');
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  Accounts.create(req.account)
    .then(account => {
      res.status(201).json(account)
    })
    .catch(next)
})

router.put('/:id', checkAccountId, checkAccountNameUnique, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.account)
  .then(updated => {
    res.status(200).json(updated)
  })
  .catch(next)
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.deleteById(req.params.id)
    res.json(account)
  } catch(err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500 || err.status).json({
    custom: 'something went wrong in the app',
    message: err.message,
    stack: err.stack
  })
})

module.exports = router;
