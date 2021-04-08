const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        
        this.middlewares();

        // App routes
        
        this.routes();
    }

    routes() {

        this.app.use('/api/user', require('../routes/user') );

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el prueto', this.port );
        } );
    }

    middlewares() {

        // CORS
        
        this.app.use( cors() );

        // Body Read and parse
        
        this.app.use( express.json() );
        
        // Public folder
        
        this.app.use( express.static('public') );

    }

}

module.exports = Server;