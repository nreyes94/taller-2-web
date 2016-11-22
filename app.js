//Reyes Nicolás
//13212037
//Taller 2- Programacion Web



//importando modulos externos
var express =require('express');
var path= require('path');
var logger =require('morgan');
var bodyParser = require('body-parser');

//importando modulos locales
var database = require("./database");
var enrutadorEstudiantes= require("./rutas/estudiante-enrutador");
var enrutadorCurso = require("./rutas/curso-enrutador");
var enrutadorMatricula =require("./rutas/matricula-enrutador");

//creando aplicacion express y configurandola
var app= express();

//sistema de loggeo y conversion
app.use(logger('dev'));

//solo aceptar solicitudes en formato json
app.use(bodyParser.json());

//aceptar solicitudes con formato urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));

//configuracion de archivos de front
app.use(enrutadorEstudiantes);
app.use(enrutadorCurso);
app.use(enrutadorMatricula);

//redireccion
app.use(express.static(__dirname + '/public/'));

//configurar base de datos
database.connect('13212037', function(err){
	if(err){
		console.log(' no me pude conectar');
	}
	else {
		var hostname='localhost';
		var port=3000;
		
		app.listen(port, hostname, function(){
		console.log('servidor corriendo en http://'+ hostname + 'puerto: '+ port);	
		});
	}
});