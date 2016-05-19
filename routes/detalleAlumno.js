var express = require('express');
var router = express.Router();
var DetalleAlumno = require('../model/detalleAlumno'); 
router.get('/api/detalleAlumno/',function(peticion,respuesta){
	DetalleAlumno.getDetalleAlumnos(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay detalleAlumno"});
		}
	});
});
router.get('/api/detalleAlumno/:idDetalleAlumno', function(peticion, respuesta) {
	var idDetalleAlumno = peticion.params.idDetalleAlumno;
	if(!isNaN(idDetalleAlumno)){
		DetalleAlumno.getDetalleAlumno(idDetalleAlumno, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe detalleAlumno"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/detalleAlumno', function(peticion, respuesta){
	var detalleAlumno = {
		idDetalleAlumno : null,
		idUsuario : peticion.body.idUsuario,
		idGrado : peticion.body.idGrado,
		idSeccion : peticion.body.idSeccion,
	}
	
	DetalleAlumno.insertDetalleAlumno(detalleAlumno, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/detalleAlumno/:idDetalleAlumno', function(peticion, respuesta) {
	var updateDetalleAlumno={
		idDetalleAlumno : peticion.params.idDetalleAlumno,
		idUsuario : peticion.body.idUsuario,
		idGrado : peticion.body.idGrado,
		idSeccion : peticion.body.idSeccion,
	}
	DetalleAlumno.updateDetalleAlumno(updateDetalleAlumno,function(error,detalleAlumno){
		if(typeof detalleAlumno !== 'undefined'){
			respuesta.json(detalleAlumno)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/detalleAlumno/:idDetalleAlumno', function(peticion,respuesta){
	var idDetalleAlumno = peticion.params.idDetalleAlumno;
	
	DetalleAlumno.deleteDetalleAlumno(idDetalleAlumno, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
