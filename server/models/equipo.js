const Sequelize = require('Sequelize')
const sequelizeDB = require('../utils/database')
  
const Equipo = sequelizeDB.define('equipo', {

    equipo_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    nombre: { type: Sequelize.STRING, allowNull:false },
    descripcion: { type: Sequelize.STRING, allowNull:false },
    titulos: { type: Sequelize.INTEGER, allowNull:false },
    estado: { type: Sequelize.BOOLEAN, allowNull:false, defaultValue:true },
    logo: { type: Sequelize.STRING, allowNull:true },
})
  
module.exports = Equipo;