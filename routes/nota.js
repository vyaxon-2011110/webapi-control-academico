var express = require('express');
var router = express.Router();
var Nota = require('../model/nota'); 
router.get('/api/nota/',function(peticion,respuesta){
	Nota.getNotas(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay nota"});
		}
	});
});
router.get('/api/nota/:idNota', function(peticion, respuesta) {
	var idNota = peticion.params.idNota;
	if(!isNaN(idNota)){
		Nota.getNota(idNota, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe nota"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/nota', function(peticion, respuesta){
	var nota = {
		idNota : null,
		punteo : peticion.body.punteo,
		idActividad : peticion.body.idActividad,
		idDetalleAlumno :peticion.body.idDetalleAlumno,
	}
	
	Nota.insertNota(nota, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/nota/:idNota', function(peticion, respuesta) {
	var updateNota={
		idNota : peticion.params.idNota,
		punteo : peticion.body.punteo,
		idActividad : peticion.body.idActividad,
		idDetalleAlumno :peticion.body.idDetalleAlumno,
	}
	Nota.updateNota(updateNota,function(error,nota){
		if(typeof nota !== 'undefined'){
			respuesta.json(nota)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/nota/:idNota', function(peticion,respuesta){
	var idNota = peticion.params.idNota;
	
	Nota.deleteNota(idNota, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
