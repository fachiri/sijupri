const Sequelize = require("sequelize")
const config = require('./../config/keys').db
const sequelize = new Sequelize(
  config.name,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require("./user.model.js")(sequelize, Sequelize)
db.Student = require("./student.model.js")(sequelize, Sequelize)
db.Lecturer = require("./lecturer.model.js")(sequelize, Sequelize)
db.Administrator = require("./administrator.model.js")(sequelize, Sequelize)
db.Role = require("./role.model.js")(sequelize, Sequelize)
db.Fieldwork = require("./fieldwork.model.js")(sequelize, Sequelize)
db.Group = require("./group.model.js")(sequelize, Sequelize)
db.Journal = require("./journal.model.js")(sequelize, Sequelize)

db.User.hasOne(db.Student, { onDelete: 'CASCADE' })
db.User.hasOne(db.Lecturer, { onDelete: 'CASCADE' })
db.User.hasOne(db.Administrator, { onDelete: 'CASCADE' })
db.Student.belongsTo(db.User, { onDelete: 'CASCADE' })
db.Lecturer.belongsTo(db.User, { onDelete: 'CASCADE' })
db.Administrator.belongsTo(db.User, { onDelete: 'CASCADE' })
db.Fieldwork.hasMany(db.Group)
db.Group.belongsTo(db.Fieldwork, { onDelete: 'CASCADE' })
db.Group.hasMany(db.Journal)
db.Journal.belongsTo(db.Group, { onDelete: 'CASCADE' })
db.Student.hasMany(db.Journal)
db.Journal.belongsTo(db.Student, { onDelete: 'CASCADE' })

db.Group.belongsToMany(db.Student, { through: 'GroupStudent' });
db.Student.belongsToMany(db.Group, { through: 'GroupStudent' });
db.Group.belongsToMany(db.Lecturer, { through: 'GroupLecturer' });
db.Lecturer.belongsToMany(db.Group, { through: 'GroupLecturer' });

module.exports = db