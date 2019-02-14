
let express = require('express');           // include the express library
let server = express();					    // create a server using express
server.listen(8000);                        // listen for HTTP
server.use('/',express.static('public'));   // set a static file directory
