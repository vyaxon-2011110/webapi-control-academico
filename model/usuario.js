var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var usuarioModel = {};

usuarioModel.getUsuarios = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM Usuario', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
usuarioModel.getProfesores = function(callback) {
	if(connection) {
		connection.query("SELECT usuario.nombre,usuario.apellido,usuario.nick,usuario.contrasena,Rol.nombreRol FROM usuario INNER JOIN Rol  ON usuario.idRol = Rol.idRol WHERE Rol.nombreRol = 'Profesor'", 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
usuarioModel.getAlumnos = function(callback) {
	if(connection) {
		connection.query("SELECT usuario.nombre,usuario.apellido,usuario.nick,usuario.contrasena,Rol.nombreRol FROM usuario INNER JOIN Rol  ON usuario.idRol = Rol.idRol WHERE Rol.nombreRol = 'Alumno'", 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
usuarioModel.getUsuario = function(idRol, callback) {
	var id = connection.escape(idRol);
	var sql = 'SELECT * FROM Usuario where idUsuario = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

usuarioModel.insertUsuario = function(usuario, callback){
	if(connection) {
		connection.query('INSERT INTO Usuario SET ?', usuario, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
usuarioModel.updateUsuario = function(usuario, callback){
	if(connection){
		connection.query('Update Usuario SET nombre= ?,apellido=?,nick=?,contrasena=?,idRol=? where idUsuario=?',
		[usuario.nombre, usuario.apellido,usuario.nick,usuario.contrasena,usuario.idRol,usuario.idUsuario],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,usuario);
			}
		});
	}
}
usuarioModel.deleteUsuario = function(idUsuario,callback){
	if (connection){
		connection.query('DELETE FROM Usuario WHERE idUsuario=?',
		idUsuario,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = usuarioModel;