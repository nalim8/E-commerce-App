const router = require('express').Router();
const UserModel = require('../models/userModel');

const User = new UserModel();
 
router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;

    const result = await User.findOneById(userId);
    res.status(200).send(result);
  } catch(err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const userData = req.body;

    const result = await User.create(userData);
    res.status(201).send(result);
  } catch(err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    const result = await User.update(userId, userData);
    res.status(200).send(result);
  } catch(err) {
    next(err);
  }
});

module.exports = router;