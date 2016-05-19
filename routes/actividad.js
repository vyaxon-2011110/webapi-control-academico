var express = require('express');
var router = express.Router();
var Actividad = require('../model/actividad'); 
router.get('/api/actividad/',function(peticion,respuesta){
	Actividad.getActividades(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay actividad"});
		}
	});
});
router.get('/api/actividad/:idActividad', function(peticion, respuesta) {
	var idActividad = peticion.params.idActividad;
	if(!isNaN(idActividad)){
		Actividad.getActividad(idActividad, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe actividad"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/actividad', function(peticion, respuesta){
	var actividad = {
		idActividad : null,
		contenido : peticion.body.contenido,
		fechaInicial : peticion.body.fechaInicial,
		fechaFinal :peticion.body.fechaFinal,
		materiales :peticion.body.materiales,
		tareas :peticion.body.tareas,
		ponderacion :peticion.body.ponderacion,
		logro : peticion.body.logro,
		idPlanificacion :peticion.body.idPlanificacion
	}
	
	Actividad.insertActividad(actividad, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/actividad/:idActividad', function(peticion, respuesta) {
	var updateActividad={
		idActividad : peticion.params.idActividad,
		contenido : peticion.body.contenido,
		fechaInicial : peticion.body.fechaInicial,
		fechaFinal :peticion.body.fechaFinal,
		materiales :peticion.body.materiales,
		tareas :peticion.body.tareas,
		ponderacion :peticion.body.ponderacion,
		logro : peticion.body.logro,
		idPlanificacion :peticion.body.idPlanificacion
	}
	Actividad.updateActividad(updateActividad,function(error,actividad){
		if(typeof actividad !== 'undefined'){
			respuesta.json(actividad)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/actividad/:idActividad', function(peticion,respuesta){
	var idActividad = peticion.params.idActividad;
	
	Actividad.deleteActividad(idActividad, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
