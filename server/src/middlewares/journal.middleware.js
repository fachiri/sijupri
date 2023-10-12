const Joi = require('joi')
const moment = require('moment');

module.exports = {
  validateAddJournal: async (req, res, next) => {
    try {
      const { userId, groupId, date, start, end, name, desc, location, outcome, note } = req.body
      const { mimetype, size } = req.file || {}

      const startMoment = moment(start, 'HH:mm');
      const endMoment = moment(end, 'HH:mm');

      if (!endMoment.isValid() || !startMoment.isValid() || endMoment.isSameOrBefore(startMoment)) {
        throw { code: 400, message: 'Waktu kegiatan tidak valid' };
      }

      const allowedMimetypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif']
      const schema = Joi.object({
        groupId: Joi.string().required().messages({
          'string.empty': 'Jenis kegiatan harus dipilih'
        }),
        userId: Joi.string().required().messages({
          'string.empty': 'ID pengguna tidak ditemukan'
        }),
        date: Joi.date().less(moment().add(1, 'days').startOf('day')).required().messages({
          'date.less': 'Tanggal harus kurang dari atau sama dengan hari ini'
        }),
        start: Joi.string().required().messages({
          'string.empty': 'Waktu mulai harus diisi'
        }),
        end: Joi.string().required().messages({
          'string.empty': 'Waktu selesai harus diisi'
        }),
        name: Joi.string().max(50).required().messages({
          'string.max': 'Nama maksimal 50 karakter',
          'string.empty': 'Nama harus diisi'
        }),
        desc: Joi.string().required().messages({
          'string.empty': 'Deskripsi harus diisi'
        }),
        location: Joi.string().required().messages({
          'string.empty': 'Lokasi harus diisi'
        }),
        outcome: Joi.number().integer().min(0).max(100).required().messages({
          'number.min': 'Outcome minimal 0',
          'number.max': 'Outcome maksimal 100',
          'number.integer': 'Outcome harus berupa bilangan bulat',
          'any.required': 'Outcome harus diisi'
        }),
        note: Joi.string().allow(null, ''),
        mimetype: Joi.string().valid(...allowedMimetypes).allow(null).messages({
          'any.only': 'Tipe file tidak valid. Hanya mendukung tipe file: svg, png, jpeg, gif',
          'any.allowOnly': 'Tipe file tidak valid. Hanya mendukung tipe file: svg, png, jpeg, gif'
        }),
        size: Joi.number().max(2 * 1024 * 1024).allow(null).messages({
          'number.max': 'Ukuran file maksimal 2 MB'
        })
      });

      await schema.validateAsync({ userId, groupId, date, start, end, name, desc, location, outcome, note, mimetype, size })

      next()
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      })
    }
  },
  validateAddFieldwork: async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        periode: Joi.string().required()
      })

      const { name, type, periode } = req.body

      await schema.validateAsync({ name, type, periode })

      next()
    } catch (error) {
      res.status(error.code || 500).send({
        success: false,
        message: error.message,
        data: {}
      })
    }
  }
}