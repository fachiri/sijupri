module.exports = (sequelize, Sequelize) => {
    const GroupLecturer = sequelize.define('grouplecturer', {
        groupId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        lecturerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      });

    return GroupLecturer;
};