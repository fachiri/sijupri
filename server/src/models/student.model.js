module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students", {
        nim: {
            type: Sequelize.STRING(20),
            allowNull: false,
        }
    });

    return Student;
};