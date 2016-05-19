var express = require('express');
var router = express.Router();
var Rol = require('../model/rol');
/* GET home page. */
/* GET home page. */
router.get('/', function(req, res, next) {
	Rol.getRoles(function(error,roles){
		if(typeof roles !=='undefined'){
			res.render('index',
			{
				encabezado : 'Lista de Roles',
				roles : roles
			});
		}else{
			res.json({"mensaje": "No hay roles"});
		}
	});
});

module.exports = router;