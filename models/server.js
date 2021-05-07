const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        // Connect DB

        this.connectDB();

        // Middlewares
        
        this.middlewares();

        // App routes
        
        this.routes();

    }

    routes() {

        this.app.use( '/api/auth', require('../routes/auth') );

        this.app.use( '/api/user', require('../routes/user') );

    }

    listen() {

        this.app.listen( this.port, () => {
            console.log( 'Server running on port', this.port );
        } );
    }

    async connectDB() {

        await dbConnection();

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