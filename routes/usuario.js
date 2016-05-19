var express = require('express');
var router = express.Router();
var Usuario = require('../model/usuario'); 

router.get('/api/usuario/',function(peticion,respuesta){
	Usuario.getUsuarios(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay usuarios"});
		}
	});
});
router.get('/api/usuario/:idUsuario', function(peticion, respuesta) {
	var idUsuario = peticion.params.idUsuario;
	if(!isNaN(idUsuario)){
		Usuario.getUsuario(idUsuario, function(error, dato){
			if(typeof dato !== 'undefined' && dato.length > 0){
				respuesta.json(dato);
			} else {
				respuesta.json({"mensaje" : "No existe usuario"});
			}
		});
	} else {
		respuesta.json({"mensaje" : "el id debe ser numerico"});
	}
});
router.get('/api/profesor/',function(peticion,respuesta){
	Usuario.getProfesores(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay usuarios"});
		}
	});
});

router.get('/api/alumno/',function(peticion,respuesta){
	Usuario.getAlumnos(function(error,datos){
		if(typeof datos !=='undefined'){
			respuesta.json(datos);
		}else{
			respuesta.json({"mensaje": "No hay usuarios"});
		}
	});
});
router.post('/api/usuario', function(peticion, respuesta){
	var usuario = {
		idUsuario : null,
		nombre : peticion.body.nombre,
		apellido : peticion.body.apellido,
		nick : peticion.body.nick,
		contrasena : peticion.body.contrasena,
		idRol : peticion.body.idRol,
	}
	
	Usuario.insertUsuario(usuario, function(error, dato) {
		if(dato && dato.insertId) {
			respuesta.json({"comentario" : dato.insertId});
		} else {
			respuesta.json({"mensaje" : "No se ingreso el usuario"});
		}
	});
});
router.put('/api/usuario/:idUsuario', function(peticion, respuesta) {
	var updateUsuario={
		idUsuario : peticion.params.idUsuario,
		nombre : peticion.body.nombre,
		apellido : peticion.body.apellido,
		nick : peticion.body.nick,
		contrasena : peticion.body.contrasena,
		idRol : peticion.body.idRol,
	}
	Usuario.updateUsuario(updateUsuario,function(error,rol){
		if(typeof rol !== 'undefined'){
			respuesta.json(rol)
		}else{
			respuesta.json({"Mensaje":"No se pudo actualizar"});
		}
	});
});
router.delete('/api/usuario/:idUsuario', function(peticion,respuesta){
	var idUsuario = peticion.params.idUsuario;
	
	Usuario.deleteUsuario(idUsuario, function(error, dato){
		if(dato && dato.mensaje === "Eliminado"){
			respuesta.json({"Mensaje":"Eliminado correctamente"});
		}else{
			respuesta.json({"Mensaje":"Ërror"});
		}
	});
});
module.exports = router;
