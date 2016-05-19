var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var DetalleModel = {};

DetalleModel.getDetalles = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM detallemateria', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
DetalleModel.getDetalle = function(idDetalle, callback) {
	var id = connection.escape(idDetalle);
	var sql = 'SELECT * FROM detallemateria where idDetalle = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

DetalleModel.insertDetalle = function(idDetalle, callback){
	if(connection) {
		connection.query('INSERT INTO detallemateria SET ?', idDetalle, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
DetalleModel.updateDetalle = function(detalle, callback){
	if(connection){
		connection.query('Update detallemateria SET idMateria= ?,idUsuario=? where idDetalle=?',
		[detalle.idMateria, detalle.idUsuario,detalle.idDetalle],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,detalle);
			}
		});
	}
}
DetalleModel.deleteDetalle = function(idDetalle,callback){
	if (connection){
		connection.query('DELETE FROM detallemateria WHERE idDetalle=?',
		idDetalle,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = DetalleModel;