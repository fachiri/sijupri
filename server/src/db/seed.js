const bcrypt = require('bcryptjs');
const db = require('./../models');
const { randomString } = require('../utils/generate.utils');

try {
  db.Role.findOrCreate({
    where: { id: 1 },
    defaults: { role: 'MAHASISWA' }
  })

  db.Role.findOrCreate({
    where: { id: 2 },
    defaults: { role: 'DOSEN' }
  })

  db.Role.findOrCreate({
    where: { id: 3 },
    defaults: { role: 'ADMINISTRATOR' }
  })

  db.User.findOrCreate({
    where: { id: 1 },
    defaults: {
      name: 'Administrator',
      username: 'admin',
      password: bcrypt.hashSync('admin'),
      avatar: `https://robohash.org/${randomString(10)}`
    }
  }).then((result) => {
    const user = result[0]
    db.Administrator.findOrCreate({
      where: { id: 1 },
      defaults: {
        userId: user.id,
        idNumber: 'admin'
      }
    })
    console.log(`-- user, administrator ${user.uuid} created`)
  });

  db.User.findOrCreate({
    where: { id: 2 },
    defaults: {
      name: 'Muh. Fachry J.K. Luid',
      username: '531420003',
      password: bcrypt.hashSync('531420003'),
      avatar: `https://robohash.org/${randomString(10)}`
    }
  }).then((result) => {
    const user = result[0]
    db.Student.findOrCreate({
      where: { id: 1 },
      defaults: {
        userId: user.id,
        nim: '531420003'
      }
    })
    console.log(`-- user, student ${user.uuid} created`)
  });
} catch (error) {

}