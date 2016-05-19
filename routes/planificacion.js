var express = require('express');
var router = express.Router();
var Planificacion = require('../model/planificacion'); 
router.get('/api/planificacion/',function(peticion,respuesta){
	Planificacion.getPlanificaciones(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay planificacion"});
		}
	});
});
router.get('/api/planificacion/:idPlanificacion', function(peticion, respuesta) {
	var idPlanificacion = peticion.params.idPlanificacion;
	if(!isNaN(idPlanificacion)){
		Planificacion.getPlanificacion(idPlanificacion, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe planificacion"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/planificacion', function(peticion, respuesta){
	var planificacion = {
		idPlanificacion : null,
		idBimestre : peticion.body.idBimestre,
		idUsuario : peticion.body.idUsuario,
		competencia :peticion.body.competencia,
		idMateria : peticion.body.idMateria,
		idGrado : peticion.body.idGrado
	}
	
	Planificacion.insertPlanificacion(planificacion, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/planificacion/:idPlanificacion', function(peticion, respuesta) {
	var updatePlanificacion={
		idPlanificacion : peticion.params.idPlanificacion,
		idBimestre : peticion.body.idBimestre,
		idUsuario : peticion.body.idUsuario,
		competencia :peticion.body.competencia,
		idMateria : peticion.body.idMateria,
		idGrado : peticion.body.idGrado
	}
	Planificacion.updatePlanificacion(updatePlanificacion,function(error,planificacion){
		if(typeof planificacion !== 'undefined'){
			respuesta.json(planificacion)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/planificacion/:idPlanificacion', function(peticion,respuesta){
	var idPlanificacion = peticion.params.idPlanificacion;
	
	Planificacion.deletePlanificacion(idPlanificacion, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
