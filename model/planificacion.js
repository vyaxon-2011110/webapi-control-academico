var mysql = require('mysql');
var parametros = {
	host : 'localhost',
	user : 'root',
	password : '',
	database : 'controlacademico'
}

var connection = mysql.createConnection(parametros);
var planificacionModel = {};

planificacionModel.getPlanificaciones = function(callback) {
	if(connection) {
		connection.query('SELECT * FROM planificacion', 
		function(error, resultados) {
			if(error) {
				throw error;
			} else {
				callback(null, resultados);
			}
		});
	}
}
planificacionModel.getPlanificacion = function(idPlanificacion, callback) {
	var id = connection.escape(idPlanificacion);
	var sql = 'SELECT planificacion.idBimestre,planificacion.idUsuario,planificacion.competencia,usuario.nombre,usuario.apellido FROM planificacion INNER JOIN usuario ON planificacion.idUsuario = usuario.idUsuario WHERE usuario.idUsuario = ' + id; 
	connection.query(sql, function(error, resultado){
		if(error) {
			throw error;
		} else {
			callback(null, resultado);
		}
	});
}

planificacionModel.insertPlanificacion = function(idPlanificacion, callback){
	if(connection) {
		connection.query('INSERT INTO planificacion SET ?', idPlanificacion, 
		function(error, resultado){
			if(error) {
				throw error;
			} else {
				callback(null, {"insertId": resultado.insertId});
			}
		});
	}
}
planificacionModel.updatePlanificacion = function(planificacion, callback){
	if(connection){
		connection.query('Update planificacion SET idBimestre= ?,idUsuario=?,competencia=? where idPlanificacion=?',
		[planificacion.idBimestre, planificacion.idUsuario, planificacion.competencia, planificacion.idPlanificacion],
		function(error,resultado){
			if(error){
				throw error;
			}else{
				callback(null,planificacion);
			}
		});
	}
}
planificacionModel.deletePlanificacion = function(idPlanificacion,callback){
	if (connection){
		connection.query('DELETE FROM planificacion WHERE idPlanificacion=?',
		idPlanificacion,
		function(error, resultado){
			if(error){
				throw error;
			}else{
				callback(null,{"mensaje":"Eliminado"})
			}
		});
	}
}

module.exports = planificacionModel;