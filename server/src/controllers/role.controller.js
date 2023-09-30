const express = require('express')
const db = require('../models')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const roles = await db.Role.findAll({
      attributes: ['role']
    });
    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan.',
      data: roles
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
});

module.exports = router;