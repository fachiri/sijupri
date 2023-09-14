module.exports = (sequelize, Sequelize) => {
    const Administrator = sequelize.define("administrators", {
        idNumber: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
    });

    return Administrator;
};