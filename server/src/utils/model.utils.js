const db = require('./../models')
const fs = require('fs')
const path = require('path')
const { app } = require('./../config/keys')

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
  },
  getImageSource: async (image) => {
    try {
      const imagePath = path.join(__dirname, `../../public/uploads/${image}`);
      await fs.promises.access(imagePath, fs.constants.F_OK);
      return `${app.url}/uploads/${image}`;
    } catch (error) {
      console.log(error);
      return `${app.url}/assets/default-image.jpg`;
    }
  }
}

module.exports = modelUtils