const express = require('express')
const auth = require('./auth.controller.js')
const user = require('./user.controller.js')
const roles = require('./role.controller.js')
const journal = require('./journal.controller.js')
const admin = require('./admin.controller.js')
const { verifyToken, isAdmin } = require('./../middlewares/auth.middleware.js')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Dokumentasi Api Sijupri',
  })
})

router.use('/auth', auth)
router.use('/roles', roles)
router.use('/user', verifyToken, user)
router.use('/journal', verifyToken, journal)
router.use('/admin', [verifyToken, isAdmin], admin)

module.exports = router