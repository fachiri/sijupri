module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        }
    });

    return User;
};