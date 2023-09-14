module.exports = (sequelize, Sequelize) => {
    const GroupStudent = sequelize.define('groupstudent', {
        groupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        studentId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      });

    return GroupStudent;
};