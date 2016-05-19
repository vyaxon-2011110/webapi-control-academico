var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var actividadModel = {};

actividadModel.getActividades = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM actividad', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
actividadModel.getActividad = function(idActividad, callback) {
	var id = connection.escape(idActividad);
		var sql = "SELECT actividad.contenido,actividad.fechaInicial,actividad.fechaFinal,actividad.materiales,actividad.tareas,actividad.ponderacion,actividad.logro,actividad.idPlanificacion,planificacion.idPlanificacion FROM actividad INNER JOIN planificacion  ON actividad.idPlanificacion=planificacion.idPlanificacion  WHERE planificacion.idPlanificacion = " + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

actividadModel.insertActividad = function(idActividad, callback){
	if(connection) {
		connection.query('INSERT INTO actividad SET ?', idActividad, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
actividadModel.updateActividad = function(actividad, callback){
	if(connection){
		connection.query('Update actividad SET indicadorLogro= ?,contenido=?,fecha=?,materiales=?,tareas=?,ponderacion=?,idPlanificacion=? where idActividad=?',
		[actividad.indicadorLogro, actividad.contenido, actividad.fecha, actividad.materiales,actividad.tareas, actividad.ponderacion, actividad.idPlanificacion, actividad.idActividad],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,actividad);
			}
		});
	}
}
actividadModel.deleteActividad = function(idActividad,callback){
	if (connection){
		connection.query('DELETE FROM actividad WHERE idActividad=?',
		idActividad,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = actividadModel;