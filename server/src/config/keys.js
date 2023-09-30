const path = require('path')
require('dotenv').config()
module.exports = {
    app: {
        name: process.env.APP_NAME || 'Express Application by Fachry',
        url: process.env.APP_URL || 'http://localhost:5000'
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
    aws: {
        region: process.env.AWS_REGION,
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        session: process.env.AWS_SESSION_TOKEN,
    },
    secret: process.env.TOKEN,
    dir: {
        upload: path.join(__dirname, '../../public/uploads/')
    }
};