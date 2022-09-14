const Sequalize = require('Sequelize');

const sequalizeDB = new Sequalize(
    'prueba',
    'root',
    'root',
    {
        dialect: 'mysql',
        host: 'localhost',
        port:'3310'
    }
);

module.exports = sequalizeDB;