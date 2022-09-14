var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

const Equipo = require('../models/equipo');

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id/:campo', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;
    let campo = req.params.campo;
    //tipos de colecciones
    var tiposValidos = ['equipos'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no valido',
            errors: { message: 'El tipo de coleccion no se encuentra entre los tipos validos' }
        });
    }
    //verifica si seleccionaron archivo
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debes seleccionar un archivo' }
        });
    }

    //obtener nombre del archivo
    var archivo = req.files.archivo1;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //extensiones aceptadas
    var extencionesValidas = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG', 'webp', 'WEBP'];

    if (extencionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extencion no valida',
            errors: { message: 'Las extenciones validas son ' + extencionesValidas.join(', ') }
        });
    }

    //nombre de archivo personalizado
    var nombreArchivo = `${ id }-${new Date().getMilliseconds()}.${extensionArchivo}`;
    //mover archivo a un path especifico
    var path = `./uploads/${ tipo }/${nombreArchivo}`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        if (tipo === 'equipos') {
            imagenEquipo(id, res, nombreArchivo, campo);
        }

    })
});

async function imagenEquipo(id, res, nombreArchivo, campo) {
    await Equipo.update({
        logo:nombreArchivo,
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
    // Equipo.findById(id, (err, equipo) => {
    //     if (err) {
    //         borraArchivo(nombreArchivo, 'equipos');
    //         return res.status(500).json({
    //             ok: false,
    //             mensaje: 'Error al consultar equipos',
    //             errors: err
    //         });
    //     }
    //     if (!equipo) {
    //         borraArchivo(nombreArchivo, 'equipos');
    //         return res.status(500).json({
    //             ok: false,
    //             mensaje: 'No se encontro ningun equipo con ese id',
    //             errors: { message: 'no se encontro ningun equipo con el id ' + id }
    //         });
    //     }
    //     borraArchivo(equipo.logo, 'equipos');
    //     if (campo == 'logo') {
    //         equipo.logo = nombreArchivo;
    //     }

    //     equipo.save((err, equipoActualizado) => {
    //         if (err) {
    //             return res.status(500).json({
    //                 ok: false,
    //                 mensaje: 'Error al actualizar equipo',
    //                 errors: err
    //             });
    //         }
    //         res.status(200).json({
    //             ok: true,
    //             mensaje: 'Archivo de equipo actualizado',
    //             equipo: equipoActualizado
    //         });
    //     });

    // });
}

function borraArchivo(nombreImagen, tipo) {

    let pathImagen = `./uploads/${ tipo }/${ nombreImagen }`;
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}
module.exports = app;