var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var detalleAlumno = {};

detalleAlumno.getDetalleAlumnos = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM detallealumno', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
detalleAlumno.getDetalleAlumno = function(idDetalleAlumno, callback) {
	var id = connection.escape(idDetalleAlumno);
	var sql = 'SELECT * FROM detallealumno where idDetalleAlumno = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

detalleAlumno.insertDetalleAlumno = function(idDetalleAlumno, callback){
	if(connection) {
		connection.query('INSERT INTO detallealumno SET ?', idDetalleAlumno, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
detalleAlumno.updateDetalleAlumno = function(detallealumno, callback){
	if(connection){
		connection.query('Update detallealumno SET idUsuario= ?,idGrado=?,idSeccion=? where idDetalleAlumno=?',
		[detallealumno.idUsuario, detallealumno.idGrado, detallealumno.idSeccion, detallealumno.idDetalleAlumno],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,detallealumno);
			}
		});
	}
}
detalleAlumno.deleteDetalleAlumno = function(idDetalleAlumno,callback){
	if (connection){
		connection.query('DELETE FROM detallealumno WHERE idDetalleAlumno=?',
		idDetalleAlumno,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = detalleAlumno;