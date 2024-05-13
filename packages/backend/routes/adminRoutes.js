const express = require('express');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/admin/data', authenticate, authorize(['admin']), (req, res) => {
  res.send('This is sensitive data only for admins');
});

module.exports = router;