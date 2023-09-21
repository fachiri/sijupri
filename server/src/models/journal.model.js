module.exports = (sequelize, Sequelize) => {
    const Journal = sequelize.define("journals", {
        uuid: {
            type: Sequelize.UUID,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        start: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        end: {
            type: Sequelize.TIME,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        desc: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        outcome: {
            type: Sequelize.INTEGER(3)
        },
        note: {
            type: Sequelize.TEXT
        },
        image: {
            type: Sequelize.STRING
        },
    });

    return Journal;
};