var express = require('express');
var router = express.Router();
var Grado = require('../model/grado'); 
router.get('/api/grado/',function(peticion,respuesta){
	Grado.getGrados(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay grados"});
		}
	});
});
router.get('/api/grado/:idGrado', function(peticion, respuesta) {
	var idGrado = peticion.params.idGrado;
	if(!isNaN(idGrado)){
		Grado.getGrado(idGrado, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe grado"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/grado', function(peticion, respuesta){
	var grado = {
		idGrado : null,
		nombreGrado : peticion.body.nombre
	}
	
	Grado.insertGrado(grado, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/grado/:idGrado', function(peticion, respuesta) {
	var updateGrado={
		idGrado : peticion.params.idGrado,
		nombreGrado : peticion.body.nombre
	}
	Grado.updateGrado(updateGrado,function(error,grado){
		if(typeof grado !== 'undefined'){
			respuesta.json(grado)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/grado/:idGrado', function(peticion,respuesta){
	var idGrado = peticion.params.idGrado;
	
	Grado.deleteGrado(idGrado, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
