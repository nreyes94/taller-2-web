var db = require('../database.js');

// Crear un nuevo estudiante
exports.crearEstudiante = function(apellidos, nombres, semestre, done) {
	var values = [ apellidos, nombres, semestre ];
	db
			.get()
			.query(
					'INSERT INTO `13212037`.`appnotas_estudiantes` (apellidos, nombres, semestre) VALUES (?, ?, ?)',
					values, function(err, result) {
						if (err)
							return done(err);
						done(null, result.insertId);
					});
};
// Consultar un estudiante en particular
exports.getEstudiantes = function(id, done) {
	db.get().query(
			'SELECT * FROM appnotas_estudiantes WHERE id_estudiante = ?', id,
			function(err, rows) {
				if (err)
					return done(err);
				done(null, rows);
			});
};
//consultar todos los estudiantes
exports.getAll = function(done) {
	db.get().query('SELECT * FROM appnotas_estudiantes', function(err, rows) {
		if (err)
			return done(err);
		done(null, rows);
	});
}