require('dotenv').config();
module.exports = {
    app: {
        name: 'API Sijupri',
    },
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    secret: process.env.TOKEN
};