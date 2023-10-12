const express = require('express')
const db = require('../models')
const multer = require('multer');
const xlsx = require('xlsx');
const bcrypt = require('bcryptjs');
const { randomString, randomImage } = require('../utils/generate.utils');
const { validateAddFieldwork } = require('../middlewares/journal.middleware');

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/fieldwork', async (req, res) => {
  try {
    const { type } = req.query

    const whereClause = {};
    if (type) {
      whereClause.type = type;
    }

    const fieldworks = await db.Fieldwork.findAll({
      where: whereClause,
      attributes: ['uuid', 'name', 'type', 'periode']
    });

    res.status(200).json({
      success: true,
      message: 'Data berhasil dimuat.',
      data: fieldworks
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
});

router.post('/fieldwork', validateAddFieldwork,async (req, res) => {
  try {
    const { name, type, periode } = req.body

    const field = await db.Fieldwork.create({
      name,
      type,
      periode
    })

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditambahkan.',
      data: field
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
});

router.put('/fieldwork/:uuid', async (req, res) => {
  try {
    const { name, type, periode } = req.body
    const { uuid } = req.params

    const fieldwork = await db.Fieldwork.findOne({
      where: {
        uuid
      }
    })

    if (!fieldwork) {
      throw { code: 404, message: 'Data tidak ditemukan.' }
    }

    fieldwork.name = name
    fieldwork.type = type
    fieldwork.periode = periode

    await fieldwork.save()

    res.status(200).json({
      success: true,
      message: 'Data berhasil diedit.',
      data: fieldwork
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
});

router.get('/fieldwork/:uuid', async (req, res) => {
  try {
    const { uuid } = req.params

    const fieldwork = await db.Fieldwork.findOne({
      where: {
        uuid
      },
      attributes: {
        exclude: ['id']
      }
    })

    if (!fieldwork) {
      throw { code: 404, message: 'Data tidak ditemukan.' }
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan',
      data: fieldwork
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
});

router.delete('/fieldwork/:uuid', async (req, res) => {
  try {
    const fieldwork = await db.Fieldwork.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if(!fieldwork) {
      throw {code: 404, message: 'Data not found'}
    }

    await db.Fieldwork.destroy({
      where: {
        uuid: req.params.uuid
      }
    })

    res.status(200).json({
      success: true,
      message: `Data "${fieldwork.name} Periode ${fieldwork.periode}" berhasil dihapus`,
      data: []
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
});

router.get('/groups/:fieldworkId', async (req, res) => {
  try {
    const { fieldworkId } = req.params

    const fieldwork = await db.Fieldwork.findOne({
      where: {
        uuid: fieldworkId
      },
      rejectOnEmpty: true
    })

    const groups = await db.Group.findAll({
      where: {
        fieldworkId: fieldwork.id
      },
      attributes: ['location', 'pembimbing1', 'pembimbing2'],
      include: [
        {
          model: db.Student,
          attributes: ['nim'],
          include: {
            model: db.User,
            attributes: ['name'],
          },
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: 'Data berhasil dimuat.',
      data: groups
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
})

router.post('/groups/import', upload.single('file'), async (req, res) => {
  try {
    const { fieldworkUuid } = req.body

    if (!req.file) {
      throw { code: 400, message: 'File tidak diunggah.' };
    }

    if (!fieldworkUuid) {
      throw { code: 400, message: 'Fieldwork harus diisi.' };
    }

    const groups = await db.Group.findAll()

    groups.forEach(async (e) => {
      await db.Group.destroy({
        where: {
          id: e.id
        }
      })
    });

    const fieldwork = await db.Fieldwork.findOne({
      where: {
        uuid: fieldworkUuid
      },
      rejectOnEmpty: true
    })

    const fileBuffer = req.file.buffer;
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetNames = workbook.SheetNames;
    const firstSheetName = sheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    let groupId
    for (const e of data) {
      let student = await db.Student.findOne({
        where: {
          nim: e.NIM,
        },
        include: { model: db.User },
      });

      if (!student) {
        const user = await db.User.create({
          name: e.NAMA,
          username: e.NIM,
          password: bcrypt.hashSync(e.NIM.toString()),
          avatar: randomImage(),
        });
        student = await db.Student.create({
          nim: e.NIM,
          userId: user.id,
        });
      }

      const payload = {
        fieldworkId: fieldwork.id,
        location: e['LOKASI KERJA PRAKTEK'],
        pembimbing1: e['PEMBIMBING 1'],
        pembimbing2: e['PEMBIMBING 2'],
        pembimbing3: e['PEMBIMBING 3'],
      };

      if (payload.pembimbing1) {
        const group = await db.Group.create(payload);
        groupId = group.id
      }

      await db.sequelize.models.GroupStudent.create({
        groupId,
        studentId: student.id,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil di import',
      data: {}
    });

  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message || 'Terjadi kesalahan saat memproses data.',
      data: {},
    });
  }
});


module.exports = router;