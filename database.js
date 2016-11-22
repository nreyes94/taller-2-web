var mysql =require('mysql');

var state={
		pool: null,
}

exports.connect=function(con,done){
	 state.pool = mysql.createPool({
		    host: 'programacion-web-test.cejfwltsp021.sa-east-1.rds.amazonaws.com',
		    user: '13212037',
		    password: 'coaster2',
		    database: '13212037'
		    
	 });
	 state.con=con;
	 done();
}
exports.get=function(){
	return state.pool;
};

