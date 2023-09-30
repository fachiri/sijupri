module.exports = (sequelize, Sequelize) => {
    const Fieldwork = sequelize.define("fieldworks", {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        periode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Fieldwork;
};