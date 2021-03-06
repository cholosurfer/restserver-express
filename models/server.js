const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');
const { auth } = require('google-auth-library');

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

        this.app.use( '/api/category', require('../routes/category') );

        this.app.use( '/api/product', require('../routes/product') );

        this.app.use( '/api/search', require('../routes/search') );

        this.app.use( '/api/user', require('../routes/user') );

        this.app.use( '/api/upload', require('../routes/upload') );

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

        // Express File Upload

        this.app.use( fileUpload({
            createParentPath: true,
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }) );

    }

}

module.exports = Server;