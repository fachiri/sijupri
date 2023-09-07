const express = require('express');
const auth = require('./auth.controller.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Dokumentasi Api Sijupri',
  });
});

router.use('/auth', auth);

module.exports = router;