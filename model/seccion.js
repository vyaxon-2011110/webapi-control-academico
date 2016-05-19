var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var seccionModel = {};

seccionModel.getSecciones = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM seccion', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
seccionModel.getSeccion = function(idSeccion, callback) {
	var id = connection.escape(idSeccion);
	var sql = 'SELECT * FROM seccion where idSeccion = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

seccionModel.insertSeccion = function(idSeccion, callback){
	if(connection) {
		connection.query('INSERT INTO seccion SET ?', idSeccion, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
seccionModel.updateSeccion= function(seccion, callback){
	if(connection){
		connection.query('Update seccion SET nombreSeccion= ? where idSeccion=?',
		[seccion.nombreSeccion, seccion.idSeccion],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,seccion);
			}
		});
	}
}
seccionModel.deleteSeccion = function(idSeccion,callback){
	if (connection){
		connection.query('DELETE FROM seccion WHERE idSeccion=?',
		idSeccion,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = seccionModel;