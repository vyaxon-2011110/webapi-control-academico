var express = require('express');
var router = express.Router();
var Rol = require('../model/rol'); 

router.get('/api/rol/',function(peticion,respuesta){
	Rol.getRoles(function(error,roles){
		if(typeof roles !=='undefined'){
			respuesta.render('index',
			{
				encabezado : 'Lista de Roles',
				roles : roles
			});
		}else{
			respuesta.json({"mensaje": "No hay roles"});
		}
	});
});
router.get('/api/rol/:idRol', function(peticion, respuesta) {
	var idRol = peticion.params.idRol;
	if(!isNaN(idRol)){
		Rol.getRol(idRol, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe Rol"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.post('/api/rol', function(peticion, respuesta){
	var rol = {
		idRol : null,
		nombreRol : peticion.body.nombreRol
	}
	
	Rol.insertRol(rol, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso la categoria"});
		}
	});
});
router.put('/api/rol/:idRol', function(peticion, respuesta) {
	var updateRol={
		idRol : peticion.params.idRol,
		nombreRol : peticion.body.nombreRol
	}
	Rol.updateRol(updateRol,function(error,rol){
		if(typeof rol !== 'undefined'){
			respuesta.json(rol)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/rol/:idRol', function(peticion,respuesta){
	var idRol = peticion.params.idRol;
	
	Rol.deleteRol(idRol, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
