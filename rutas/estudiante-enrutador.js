//se importan modulos
var express = require('express');
var bodyParser = require('body-parser');
var controlador = require('../controlador/estudiante-controlador.js');
var fs = require('fs');

module.exports = (function() {
	var enrutador = express.Router();
	enrutador.use(bodyParser.json());
		
	// consultar todos los estudiantes
	enrutador.route('/servicios/estudiantes/').get(function(req, res, next) {
		controlador.getAll(function(err, respuesta) {
			if (!err) {
				res.json(respuesta);
			} else {
				res.json(err);
			}
		})
	});
//consultar un estudiante por su ID
	enrutador.route('/servicios/estudiantes/:id_estudiante').get(
			function(req, res, next) {
				controlador.getEstudiantes(req.params.id_estudiante, function(
						err, respuesta) {
					if (!err) {
						res.json(respuesta);
					} else {
						res.json(err);
					}
				})
			})
//crear un estudiante
	enrutador.route('/servicios/estudiantes/').post(
			function(req, res, next) {

				controlador.crearEstudiante(req.body.apellidos,
						req.body.nombres, req.body.semestre, function(err,
								respuesta) {
							if (err)
								throw err;
							res.write('Estudiante con apellido: '
									+ req.body.apellidos + " " + 'con nombre: '
									+ req.body.nombres + " " + 'y semestre: '
									+ req.body.semestre + "se agrego con id: "
									+ respuesta);
							res.end()

						});
			});

	return enrutador;

}());