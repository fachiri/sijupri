module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: "profile-default.png",
        }
    });

    return User;
};