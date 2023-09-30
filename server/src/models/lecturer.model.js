module.exports = (sequelize, Sequelize) => {
    const Lecturer = sequelize.define("lecturers", {
        nidn: {
            type: Sequelize.STRING(20),
            allowNull: false,
        }
    });

    return Lecturer;
};