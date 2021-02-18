const morgan = require('morgan')
const cors = require('cors')
const errorMiddleware = require('./middlewares/errorMiddleware')
const express = require('express')
const app = express()


// ----------------------------  Basic Config
//dotenv package will pick up the .env file and load those settings into Node process
const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, `./env/.env`)}); 
require('dotenv').config({ path: path.join(__dirname, `./env/.env.${process.env.NODE_ENV}`)}); 
// require('dotenv').config({ path: `./.env` })
// require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` })
const PORT = process.env.PORT || 5000;
// 3 NODE_ENV in this project: production=>publish Internet, server61=> publish on server 87.61
// const NODE_ENV = process.env.NODE_ENV || 'dev';


//----------------------------- Middlewares
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//--- json parse the request body
app.use(express.json());
app.use(morgan('tiny'));




// ---------------------------- Routes
app.use('/api', require('./API'));



app.get('/', (req, res) => {
    // throw new Error('woops');
    console.log('called / : at ' + new Date().toString())
    console.log(process.env.NODE_ENV)
    res.status(200).json({
        "NODE_ENV": process.env.NODE_ENV,
        "PORT": process.env.PORT
    });
})







// ----------------------------  Error Handler Middleware
app.use(errorMiddleware);



const server = app.listen(PORT, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log('API running at http://%s:%s', host, port);
});