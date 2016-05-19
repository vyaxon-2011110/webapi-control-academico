var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var nota = {};

nota.getNotas = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM nota', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
nota.getNota = function(idNota, callback) {
	var id = connection.escape(idNota);
	var sql = " SELECT nota.punteo,usuario.`nombre`,usuario.`apellido`,actividad.`tareas` FROM nota INNER JOIN detallealumno ON nota.`idDetalleAlumno`=detallealumno.`idDetalleAlumno` INNER JOIN usuario ON usuario.`idUsuario`=detallealumno.`idUsuario` INNER JOIN `actividad` ON actividad.`idActividad`=nota.`idActividad` WHERE detallealumno.idDetalleAlumno =" + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

nota.insertNota = function(idNota, callback){
	if(connection) {
		connection.query('INSERT INTO nota SET ?', idNota, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
nota.updateNota = function(nota, callback){
	if(connection){
		connection.query('Update nota SET punteo= ?,idActividad=?,idDetalleAlumno=? where idNota=?',
		[nota.punteo, nota.idActividad, nota.idDetalleAlumno, nota.idNota],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,nota);
			}
		});
	}
}
nota.deleteNota = function(idNota,callback){
	if (connection){
		connection.query('DELETE FROM nota WHERE idNota=?',
		idNota,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = nota;