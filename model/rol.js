var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var rolModel = {};

rolModel.getRoles = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM rol', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
rolModel.getRol = function(idRol, callback) {
	var id = connection.escape(idRol);
	var sql = 'SELECT * FROM Rol where idRol = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

rolModel.insertRol = function(rol, callback){
	if(connection) {
		connection.query('INSERT INTO rol SET ?', rol, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
rolModel.updateRol = function(rol, callback){
	if(connection){
		connection.query('Update Rol SET nombreRol= ? where idRol=?',
		[rol.nombreRol, rol.idRol],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,rol);
			}
		});
	}
}
rolModel.deleteRol = function(idRol,callback){
	if (connection){
		connection.query('DELETE FROM Rol WHERE idRol=?',
		idRol,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = rolModel;