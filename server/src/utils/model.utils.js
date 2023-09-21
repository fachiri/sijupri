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
  },
  getStudentIdByUser: async (uuid) => {
    const user = await db.User.findOne({
      where: { uuid },
      include: db.Student
    })
    
    return user.student.id
  }
}

module.exports = modelUtils