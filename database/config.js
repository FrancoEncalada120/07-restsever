var mysql      = require('mysql2');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Mysql123',
  database : 'myDB'
});


const dbConnection = async () => {

    try {

        connection.connect();

        console.log('Se conecto a la BD 111');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion');
    }

}


module.exports = { dbConnection }