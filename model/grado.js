var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var gradoModel = {};

gradoModel.getGrados = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM grado', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
gradoModel.getGrado = function(idGrado, callback) {
	var id = connection.escape(idGrado);
	var sql = 'SELECT * FROM grado where idGrado = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

gradoModel.insertGrado = function(idGrado, callback){
	if(connection) {
		connection.query('INSERT INTO grado SET ?', idGrado, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
gradoModel.updateGrado= function(grado, callback){
	if(connection){
		connection.query('Update grado SET nombreGrado= ? where idGrado=?',
		[grado.nombreGrado, grado.idGrado],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,grado);
			}
		});
	}
}
gradoModel.deleteGrado = function(idGrado,callback){
	if (connection){
		connection.query('DELETE FROM grado WHERE idGrado=?',
		idGrado,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = gradoModel;