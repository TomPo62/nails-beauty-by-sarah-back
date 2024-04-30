const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/status', (req, res) => {
  res.send({ loggedIn: true });
}, (error, req, res, next) => {
  if (error.name === 'UnauthorizedError') {
    res.status(401).send({ loggedIn: false });
  } else {
    next(error);
  }
});

module.exports = router;
