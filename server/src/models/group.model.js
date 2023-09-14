module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pembimbing1: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        pembimbing2: {
            type: Sequelize.STRING
        },
        pembimbing3: {
            type: Sequelize.STRING
        },
    });

    return Group;
};