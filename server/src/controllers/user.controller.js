const express = require('express')
const db = require('./../models')
const { getModelByRole } = require('./../utils/model.utils');
const { randomImage } = require('../utils/generate.utils');

const router = express.Router()

router.get('/:uuid/role/:role', async (req, res) => {
  try {
    const { uuid, role } = req.params

    const model = getModelByRole(role)
    const user = await db.User.findOne({
      where: { uuid },
      attributes: [
        'name',
        'username',
        'email',
        'avatar',
        [db.sequelize.col(model.fieldIdNumber), 'idNumber']
      ],
      include: { 
        model: model.model,
        attributes: [],
      }
    })

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan.',
      data: user
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
});

router.get('/:uuid/groups', async (req, res) => {
  try {
    const { uuid } = req.params

    const user = await db.User.findOne({
      where: { uuid },
      include: { 
        model: db.Student,
        include: {
          model: db.Group,
          attributes: ['uuid'],
          include: {
            model: db.Fieldwork,
            attributes: ['name', 'type', 'periode']
          }
        }
      }
    })

    const groups = user.student.groups.map(group => group)

    res.status(200).json({
      success: true,
      message: 'Data berhasil ditemukan.',
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

router.put('/:uuid/avatar', async (req, res) => {
  try {
    const user = await db.User.findOne({
      where: {
        uuid: req.params.uuid
      }
    })

    if(!user) {
      throw {code: 404, message: 'Data not found'}
    }

    user.avatar = req.body.avatar
    user.save()

    res.status(200).json({
      success: true,
      message: 'Avatar berhasil diubah.',
      data: user
    });
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
})

module.exports = router;