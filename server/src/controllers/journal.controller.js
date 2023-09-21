const express = require('express')
const db = require('./../models')
const multer = require('multer')
const Joi = require('joi')
const path = require('path');
const { randomFilename } = require('../utils/generate.utils');
const { getStudentIdByUser } = require('../utils/model.utils');
const { model } = require('mongoose');
const uploadDir = path.join(__dirname, '../uploads/');

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, randomFilename(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.post('/add', upload.single('file'), async (req, res) => {
  try {
    const allowedMimetypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif']
    const schema = Joi.object({
      groupId: Joi.string().required(),
      userId: Joi.string().required(),
      start: Joi.string().required(),
      end: Joi.string().required(),
      name: Joi.string().required(),
      desc: Joi.string().required(),
      location: Joi.string().required(),
      outcome: Joi.number().integer().min(0).max(100).required(),
      note: Joi.string().allow(null, ''),
      mimetype: Joi.string().valid(...allowedMimetypes).allow(null),
      size: Joi.number().max(2 * 1024 * 1024).allow(null)
    })

    const { userId, groupId, start, end, name, desc, location, outcome, note } = req.body
    const { mimetype, size, filename } = req.file || {}

    await schema.validateAsync({ userId, groupId, start, end, name, desc, location, outcome, note, mimetype, size })

    const user = await db.User.findOne({ 
      where: { uuid: userId },
      include: { 
        model: db.Student
      }
    })
    const group = await db.Group.findOne({
      where: { uuid: groupId }
    })

    const journal = await db.Journal.create({
      start, end, name, desc, location, outcome, note,
      image: filename,
      groupId: group.id,
      studentId: user.student.id
    })

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditambahkan.',
      data: journal
    })
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

router.get('/all/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params

    const journals = await db.Journal.findAll({
      where: { studentId: await getStudentIdByUser(uuid)},
      order: [['date', 'DESC']],
      include: [
        {
          model: db.Group,
          attributes: ['uuid'],
          include: {
            model: db.Fieldwork,
            attributes: ['type']
          }
        }
      ]
    })

    const groupedData = {}
    for (const journal of journals) {
      const date = journal.date
      if (groupedData[date]) {
        groupedData[date].push(journal)
      } else {
        groupedData[date] = [journal]
      }
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil dimuat.',
      data: groupedData
    })
  } catch (error) {
    console.log(error)
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

module.exports = router