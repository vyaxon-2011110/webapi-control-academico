var express = require('express');
var router = express.Router();
var Detalle = require('../model/detalleMateria'); 
router.get('/api/detalle/',function(peticion,respuesta){
	Detalle.getDetalles(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay detalle"});
		}
	});
});
router.get('/api/detalle/:idDetalle', function(peticion, respuesta) {
	var idDetalle = peticion.params.idDetalle;
	if(!isNaN(idDetalle)){
		Detalle.getDetalle(idDetalle, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe detalle"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/detalle', function(peticion, respuesta){
	var detalle = {
		idDetalle : null,
		idMateria : peticion.body.idMateria,
		idUsuario : peticion.body.idUsuario
	}
	
	Detalle.insertDetalle(detalle, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso el detalle"});
		}
	});
});
router.put('/api/detalle/:idDetalle', function(peticion, respuesta) {
	var updateActividad={
		idDetalle : peticion.params.idDetalle,
		idMateria : peticion.body.idMateria,
		idUsuario : peticion.body.idUsuario
	}
	Detalle.updateDetalle(updateActividad,function(error,detalle){
		if(typeof detalle !== 'undefined'){
			respuesta.json(detalle)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/detalle/:idDetalle', function(peticion,respuesta){
	var idDetalle = peticion.params.idDetalle;
	
	Detalle.deleteDetalle(idDetalle, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
