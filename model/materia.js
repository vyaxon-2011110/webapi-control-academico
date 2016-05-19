var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var materiaModel = {};

materiaModel.getMaterias = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM materia', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
materiaModel.getMateria = function(idMateria, callback) {
	var id = connection.escape(idMateria);
	var sql = 'SELECT * FROM materia where idMateria = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

materiaModel.insertMateria = function(materia, callback){
	if(connection) {
		connection.query('INSERT INTO materia SET ?', materia, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
materiaModel.updateMateria = function(materia, callback){
	if(connection){
		connection.query('Update materia SET nombreMateria= ? where idMateria=?',
		[materia.nombreMateria, materia.idMateria],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,materia);
			}
		});
	}
}
materiaModel.deleteMateria = function(idMateria,callback){
	if (connection){
		connection.query('DELETE FROM materia WHERE idMateria=?',
		idMateria,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = materiaModel;