module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
        role: {
            type: Sequelize.STRING(20),
            allowNull: false,
        }
    });

    return Role;
};