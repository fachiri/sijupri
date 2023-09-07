const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body
      const data = {
        username,
        password
      }
      res.status(200).json({
        success: true,
        message: 'Test Login',
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: {}
      });
    }
  });
  
  module.exports = router;