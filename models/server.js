const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.puerto = process.env.PORT;
        this.usuarioPatch = '/api/usuario';

        // Middlewares
        this.middlewares();

        this.routes();

    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'));



    }

    routes() {

        this.app.use(this.usuarioPatch, require('../routes/usuarios'));


    }

    listen() {
        this.app.listen(this.puerto, () => {

            console.log('Servidor corriendo en el puerto', process.env.PORT);
        })
    }
}

module.exports = Server;