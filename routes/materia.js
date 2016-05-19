var express = require('express');
var router = express.Router();
var Materia = require('../model/materia'); 
router.get('/api/materia/',function(peticion,respuesta){
	Materia.getMaterias(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay materias"});
		}
	});
});
router.get('/api/materia/:idMateria', function(peticion, respuesta) {
	var idMateria = peticion.params.idMateria;
	if(!isNaN(idMateria)){
		Materia.getMateria(idMateria, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe materia"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/materia', function(peticion, respuesta){
	var materia = {
		idMateria : null,
		nombreMateria : peticion.body.nombre
	}
	
	Materia.insertMateria(materia, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/materia/:idMateria', function(peticion, respuesta) {
	var updateMateria={
		idMateria : peticion.params.idMateria,
		nombreMateria : peticion.body.nombre
	}
	Materia.updateMateria(updateMateria,function(error,materia){
		if(typeof materia !== 'undefined'){
			respuesta.json(materia)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/materia/:idMateria', function(peticion,respuesta){
	var idMateria = peticion.params.idMateria;
	
	Materia.deleteMateria(idMateria, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
