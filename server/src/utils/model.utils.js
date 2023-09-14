const db = require('./../models')

const modelUtils = {
  getModelByRole: (role) => {
    switch (role) {
      case 'MAHASISWA':
        return {
          model: db.Student,
          fieldIdNumber: 'nim'
        }
      case 'DOSEN':
        return {
          model: db.Lecturer,
          fieldIdNumber: 'nidn'
        }
      case 'ADMINISTRATOR':
        return {
          model: db.Administrator,
          fieldIdNumber: 'idNumber'
        }
      default:
        throw { code: 400, message: 'Role tidak valid.' }
    }
  }
}

module.exports = modelUtils