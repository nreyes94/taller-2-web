var db = require('../database.js');
// consultar todos los cursos
exports.getAll = function(done) {
	db.get().query('SELECT * FROM appnotas_cursos GROUP BY nombre', function(err, rows) {
		if (err)
			return done(err);
		done(null, rows);
	})
};
// consultar un curso en particular
exports.getCurso = function(id, done) {
	db.get().query('SELECT * FROM appnotas_cursos WHERE id_curso=? GROUP BY appnotas_cursos', id,
			function(err, rows) {
				if (err)
					return done(err);
				done(null, rows);
			});
};
// consultar cursos por el periodo en el que estan
exports.getCursoPeriodo = function(periodo, done) {
	db.get().query('SELECT * FROM appnotas_cursos WHERE periodo=?', periodo,
			function(err, rows) {
				if (err)
					return done(err);
				done(null, rows);
			});
};
// consultar estudiantes por el curso matriculado

// crear un nuevo curso
exports.crearCurso = function(nombre, periodo, done) {
	var values = [ nombre, periodo ];
	db
			.get()
			.query(
					'INSERT INTO `13212037`.`appnotas_cursos` (nombre,periodo) VALUES(?,?)',
					values, function(err, result) {
						if (err)
							return done(err);
						done(null, result.insertId);
					});
};