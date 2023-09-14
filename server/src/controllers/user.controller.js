const express = require('express')
const db = require('./../models')
const { getModelByRole } = require('./../utils/model.utils')

const router = express.Router()

router.get('/:uuid/:role', async (req, res) => {
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

module.exports = router;