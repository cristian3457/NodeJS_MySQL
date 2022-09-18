const Sequalize = require('Sequelize');

const sequalizeDB = new Sequalize(
    'liga_mx34578',
    'guero34578',
    'Aguilas25*',
    {
        dialect: 'mysql',
        host: 'db4free.net',
        port:'3306'
    }
);

module.exports = sequalizeDB;