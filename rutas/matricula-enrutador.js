//enrutador realizado con la ayuda de Andres Gonzalez

var express = require('express');
var bodyParser = require('body-parser');
var controlador = require('../controlador/matricula-controlador.js');
var fs = require('fs');

module.exports = (function() {
	var enrutador = express.Router();
	enrutador.use(bodyParser.json());

	// consultar matriculas
	enrutador.route('/servicios/matricula').get(function(req, res, next) {
		controlador.getAll(function(err, respuesta) {
			if (!err) {
				res.json(respuesta);
			} else {
				res.json(err);
			}
		})
	})

	// consultar estudiantes matriculados en un curso
	enrutador.route('/servicios/cursos/:id_curso/estudiantes').get(
			function(req, res, next) {
				controlador.consultarEstudianteMatriculado(req.params.id_curso,
						function(err, respuesta) {
							if (!err) {
								res.json(respuesta);
							} else {
								res.json(err);
							}
						})
			})
	// consultar cursos matriculados por estudiante
	enrutador.route('/servicios/estudiantes/:id_estudiante/cursos').get(
			function(req, res, next) {
				controlador.consultaCursoEstudiante(req.params.id_estudiante,
						function(err, respuesta) {
							if (!err) {
								res.json(respuesta);
							} else {
								res.json(err);
							}
						})
			})
	// matricular estudiante
	enrutador.route('/servicios/matricula/').post(
			function(req, res, next) {
				console.log('Matricula con curso: ' + req.body.id_curso
						+ ' y estudiante: ' + req.body.id_estudiante);

				controlador.matricularEstudiante(req.body.id_curso,
						req.body.id_estudiante, function(err, respuesta) {
							if (err)
								throw err;
							res.json(respuesta);
							

						})
			})

	// actualizar la nota de un estudiante en un curso
	enrutador.route('/servicios/matricula/').put(
			function(req, res) {
				console.log('nota actualizada de curso: ' + req.body.id_curso
						+ " " + 'de estudiante: ' + req.body.id_estudiante
						+ " " + 'y nota: ' + req.body.nota_obtenida);
				controlador.actualizarNota(req.body.id_curso,
						req.body.id_estudiante, req.body.nota_obtenida,
						function(err, respuesta) {
							if (err)
								throw err;
							res.json(respuesta);
						})
			})
	return enrutador;
}());