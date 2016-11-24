//controlador realizado con la ayuda de Andres Gonzalez

var db = require('../database.js');
// consultar todas las matriculas
exports.getAll = function(done) {
	db.get().query('SELECT * FROM appnotas_matricula', function(err, rows) {
		if (err)
			return done(err);
		done(null, rows);
	})
};

// consultar estudiantes matriculados en un curso
exports.consultarEstudianteMatriculado = function(id, done) {
	db
			.get()
			.query(
					// query realizado con ayuda de estudiante Sergio Muñoz
					'SELECT * FROM appnotas_estudiantes INNER JOIN appnotas_matricula ON appnotas_estudiantes.id_estudiante = appnotas_matricula.id_estudiante WHERE id_curso = ?',
					id, function(err, rows) {
						if (err)
							return done(err);
						done(null, rows);
					});
};

// consultar cursos matriculados por un estudiante
exports.consultaCursoEstudiante = function(id, done) {
	db
			.get()
			.query(
					// query realizado con ayuda de estudiante Sergio Muñoz
					'SELECT * FROM appnotas_cursos INNER JOIN appnotas_matricula ON appnotas_cursos.id_curso = appnotas_matricula.id_curso WHERE id_estudiante = ?',
					id, function(err, rows) {
						if (err)
							return done(err);
						done(null, rows);
					});
};
//arreglar el query y agregar lo de avg
// matricular un estudiante en un curso
exports.matricularEstudiante = function(id_curso, id_estudiante, done) {
	var values = {
		id_curso : id_curso,
		id_estudiante : id_estudiante

	}

	db.get().query('INSERT INTO `13212037`.`appnotas_matricula`SET ?', values,
			function(err, result) {
				if (err)
					return done(err);
				done(null, result);
			});
};
// actualizar la nota de un estudiante en un curso

exports.actualizarNota = function(id_curso, id_estudiante, nota_obtenida, done) {
	var values = [ nota_obtenida, id_curso, id_estudiante ];
	db
			.get()
			.query(
					'UPDATE appnotas_matricula SET nota_obtenida = ? WHERE id_curso = ? AND id_estudiante = ?',
					values, function(err, result) {
						if (err)
							return done(err);
						done(null, result);
					});

}
