const express = require('express')
const db = require('./../models')
const multer = require('multer')
const { randomFilename } = require('../utils/generate.utils')
const { getStudentIdByUser, getImageSource } = require('../utils/model.utils')
const { validateAddJournal } = require('../middlewares/journal.middleware')
const { dir } = require('../config/keys')
const { timeJamMenit } = require('../utils/helper.utils')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir.upload)
  },
  filename: function (req, file, cb) {
    cb(null, randomFilename(file.originalname))
  }
})
const upload = multer({ storage: storage })

router.post('/add', [upload.single('file'), validateAddJournal], async (req, res) => {
  try {
    const { userId, groupId, date, start, end, name, desc, location, outcome, note } = req.body
    const { filename } = req.file || {}

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
      date, start, end, name, desc, location, outcome, note,
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
      where: { studentId: await getStudentIdByUser(uuid) },
      order: [['date', 'DESC'], ['start', 'DESC']],
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
      journal.image = await getImageSource(journal.image)
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

router.get('/:journalUuid', async (req, res) => {
  try {
    const { journalUuid } = req.params
    const { uuid } = req.user

    const journal = await db.Journal.findOne({
      where: {
        uuid: journalUuid,
        studentId: await getStudentIdByUser(uuid)
      },
      attributes: ['uuid', 'start', 'end', 'name', 'desc', 'location', 'outcome', 'note', 'image', 'date'],
      include: {
        model: db.Group,
        attributes: ['uuid', 'pembimbing1', 'pembimbing2', 'pembimbing3', 'location']
      }
    })

    journal.image = await getImageSource(journal.image)
    journal.start = timeJamMenit(journal.start)
    journal.end = timeJamMenit(journal.end)

    res.status(200).json({
      success: true,
      message: 'Data berhasil dimuat.',
      data: journal
    })
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    })
  }
})

module.exports = router