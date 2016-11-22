var express = require('express');
var bodyParser = require('body-parser');
var controlador = require('../controlador/curso-controlador.js');
var fs = require('fs');

module.exports = (function() {
	var enrutador = express.Router();
	enrutador.use(bodyParser.json());

	// consultar cursos
	enrutador.route('/servicios/cursos/').get(function(req, res, next) {
		controlador.getAll(function(err, respuesta) {
			if (!err) {
				res.json(respuesta);
			} else {
				res.json(err);
			}
		})
	})
	// consultar 1 curso en particular
	enrutador.route('/servicios/cursos/:id_curso').get(
			function(req, res, next) {
				controlador.getCurso(req.params.id_curso, function(err,
						respuesta) {
					if (!err) {
						res.json(respuesta);
					} else {
						res.json(err);
					}
				})
			})
	// consultar 1 periodo en particular
	enrutador.route('/servicios/cursos/periodo/:periodo').get(
			function(req, res, next) {
				controlador.getCursoPeriodo(req.params.periodo, function(err,
						respuesta) {
					if (!err) {
						res.json(respuesta);
					} else {
						res.json(err);
					}
				})
			})
	//crear un curso		
	enrutador.route('/servicios/cursos/').post(function(req,res,next){
		controlador.crearCurso(req.body.nombre, req.body.periodo,function(err,respuesta){
			if(err)
				throw err;
			res.write('Curso creado con nombre: ' +req.body.nombre + " "+ 'con periodo: '+ req.body.periodo+ "se agrego con id: "+ respuesta);
			res.end()
		});
	});
	return enrutador;
}());