const Joi = require('joi')

module.exports = {
  validateAddJournal: async (req, res, next) => {
    try {
      const allowedMimetypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif']
      const schema = Joi.object({
        groupId: Joi.string().required(),
        userId: Joi.string().required(),
        start: Joi.string().required(),
        end: Joi.string().required(),
        name: Joi.string().max(50).required(),
        desc: Joi.string().required(),
        location: Joi.string().required(),
        outcome: Joi.number().integer().min(0).max(100).required(),
        note: Joi.string().allow(null, ''),
        mimetype: Joi.string().valid(...allowedMimetypes).allow(null),
        size: Joi.number().max(2 * 1024 * 1024).allow(null)
      })

      const { userId, groupId, start, end, name, desc, location, outcome, note } = req.body
      const { mimetype, size } = req.file || {}

      await schema.validateAsync({ userId, groupId, start, end, name, desc, location, outcome, note, mimetype, size })

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