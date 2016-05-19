var express = require('express');
var router = express.Router();
var Seccion = require('../model/seccion'); 
router.get('/api/seccion/',function(peticion,respuesta){
	Seccion.getSecciones(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay secciones"});
		}
	});
});
router.get('/api/seccion/:idSeccion', function(peticion, respuesta) {
	var idSeccion = peticion.params.idSeccion;
	if(!isNaN(idSeccion)){
		Seccion.getSeccion(idSeccion, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe seccion"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/seccion', function(peticion, respuesta){
	var seccion = {
		idSeccion : null,
		nombreSeccion : peticion.body.nombre
	}
	
	Seccion.insertSeccion(seccion, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/seccion/:idSeccion', function(peticion, respuesta) {
	var updateSeccion={
		idSeccion : peticion.params.idSeccion,
		nombreSeccion : peticion.body.nombre
	}
	Seccion.updateSeccion(updateSeccion,function(error,seccion){
		if(typeof seccion !== 'undefined'){
			respuesta.json(seccion)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/seccion/:idSeccion', function(peticion,respuesta){
	var idSeccion = peticion.params.idSeccion;
	
	Seccion.deleteSeccion(idSeccion, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
