const express = require('express');
const Equipo = require('../models/equipo');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const app = express();



app.get('/equipo', async (req, res) => {
    await Equipo.findAll()
        .then(function(equipos){
            res.json({
                ok: true,
                equipos
            });
        }).catch(function(errors){
            return res.status(400).json({
                ok: false,
                errors
            });
        });
    
});
// Get by ID
app.get('/equipo/byId/:id', async(req, res) => {
    let id = req.params.id;

    await Equipo.findAll({
        where: {
            equipo_id: id
        }
      })
    .then(function(equipo){
        res.json({
            ok: true,
            equipo
        });
    }).catch(function(errors){
        return res.status(400).json({
            ok: false,
            errors
        });
    });
});

//[verificaToken, verificaAdmin_Role]
app.post('/equipo', async(req, res) => {

    let body = req.body;

    await Equipo.create({
        nombre:body.nombre,
        descripcion:body.descripcion,
        titulos:body.titulos,
      })
    .then(function(equipo){
        res.json({
            ok: true,
            equipo
        });
    }).catch(function(errors){
        return res.status(400).json({
            ok: false,
            errors
        });
    });

});
//[verificaToken, verificaAdmin_Role]
app.put('/equipo/:id', async (req, res) => {

    let id = req.params.id;
    let body = req.body;

    await Equipo.update({
        nombre:body.nombre,
        descripcion:body.descripcion,
        titulos:body.titulos,
        estado:body.estado,
      },
      {
        where:{
        equipo_id: id
      }
    })
    .then(function(user){
        res.json({
            ok: true,
            user
        });
    }).catch(function(errors){
        return res.status(400).json({
            ok: false,
            errors
        });
    });
});
//[verificaToken, verificaAdmin_Role]
app.delete('/equipo/:id', async (req, res) => {

    let id = req.params.id;

    await Equipo.update({
        estado:false,
      },
      {
        where:{
        equipo_id: id
      }
    })
    .then(function(user){
        res.json({
            ok: true,
            user
        });
    }).catch(function(errors){
        return res.status(400).json({
            ok: false,
            errors
        });
    });
});


module.exports = app;