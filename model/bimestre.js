var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var bimestreModel = {};

bimestreModel.getBimestres = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM bimestre', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
bimestreModel.getBimestre = function(idBimestre, callback) {
	var id = connection.escape(idBimestre);
	var sql = 'SELECT * FROM bimestre where idBimestre = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

bimestreModel.insertBimestre = function(idBimestre, callback){
	if(connection) {
		connection.query('INSERT INTO bimestre SET ?', idBimestre, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
bimestreModel.updateBimestre= function(bimestre, callback){
	if(connection){
		connection.query('Update bimestre SET nombreBimestre= ? where idBimestre=?',
		[bimestre.nombreBimestre, bimestre.idBimestre],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,bimestre);
			}
		});
	}
}
bimestreModel.deleteBimestre = function(idBimestre,callback){
	if (connection){
		connection.query('DELETE FROM bimestre WHERE idBimestre=?',
		idBimestre,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = bimestreModel;