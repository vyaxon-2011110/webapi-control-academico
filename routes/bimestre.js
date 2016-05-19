var express = require('express');
var router = express.Router();
var Bimestre = require('../model/bimestre'); 
router.get('/api/bimestre/',function(peticion,respuesta){
	Bimestre.getBimestres(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay bimestres"});
		}
	});
});
router.get('/api/bimestre/:idBimestre', function(peticion, respuesta) {
	var idBimestre = peticion.params.idBimestre;
	if(!isNaN(idBimestre)){
		Bimestre.getBimestre(idBimestre, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe bimestre"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/bimestre', function(peticion, respuesta){
	var bimestre = {
		idBimestre : null,
		nombreBimestre : peticion.body.nombre
	}
	
	Bimestre.insertBimestre(bimestre, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/bimestre/:idBimestre', function(peticion, respuesta) {
	var updateBimestre={
		idBimestre : peticion.params.idBimestre,
		nombreBimestre : peticion.body.nombre
	}
	Bimestre.updateBimestre(updateBimestre,function(error,bimestre){
		if(typeof bimestre !== 'undefined'){
			respuesta.json(bimestre)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/bimestre/:idBimestre', function(peticion,respuesta){
	var idBimestre = peticion.params.idBimestre;
	
	Bimestre.deleteBimestre(idBimestre, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
