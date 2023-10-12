const express = require('express')
const db = require('./../models')
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { secret } = require('./../config/keys')
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./../middlewares/auth.middleware.js')
const fs = require('fs');
const path = require('path');

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body
    let model, field
    let redirect = '/'

    switch (role) {
      case 'MAHASISWA':
        model = 'Student'
        field = 'nim'
        break;

      case 'DOSEN':
        model = 'Lecturer'
        field = 'nidn'
        break;

      case 'ADMINISTRATOR':
        model = 'Administrator'
        field = 'idNumber'
        break;

      default:
        throw { code: 401, message: 'Username atau password salah.' }
    }

    const data = await db[model].findOne({
      where: {
        [Op.or]: [
          { [field]: username },
          { '$user.username$': username },
        ]
      },
      include: { model: db.User }
    })

    if (!data) {
      throw { code: 401, message: 'Username atau password salah.' }
    }

    const passwordMatch = await bcrypt.compare(password, data.user.password);
    if (!passwordMatch) {
      throw { code: 401, message: 'Username atau password salah.' }
    }

    const tokenJwt = jwt.sign(
      { 
        role,
        uuid: data.user.uuid,
        username: data.user.username
      },
      secret, 
      { expiresIn: '1h' }
    )

    if(role === 'ADMINISTRATOR') redirect = '/administrator/dashboard'

    res.status(200).send({
      success: true,
      message: 'Login berhasil.',
      data: {
        user: {
          role,
          uuid: data.user.uuid,
          username: data.user.username
        },
        token: tokenJwt,
        redirect
      }
    });
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: {}
    });
  }
})

router.get('/verify-token/:role', verifyToken, async (req, res) => { 
  try {
    const { role } = req.params

    if (role !== req.user.role) {
      throw {code: 401, message: 'Akses tidak sah.'}
    }

    res.status(200).send({
      success: true,
      message: 'Akses berhasil.',
      data: {}
    })
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: {}
    });
  }
})

router.get('/avatars', async (req, res) => { 
  try {
    const males = fs.readdirSync(path.join(__dirname, '../../public/assets/profile/male'));
    const females = fs.readdirSync(path.join(__dirname, '../../public/assets/profile/female'));
    const data = {
      males: males.map(e => `/assets/profile/male/${e}`),
      females: females.map(e => `/assets/profile/female/${e}`)
    }

    res.status(200).send({
      success: true,
      message: 'Avatar berhasil ditemukan',
      data
    })
  } catch (error) {
    res.status(error.code || 500).send({
      success: false,
      message: error.message,
      data: {}
    });
  }
})

module.exports = router;