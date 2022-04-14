const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const path = require( 'path' )
const cors = require( 'cors' )
require( 'dotenv/config' );
const axios = require( "axios" ).default;
const session = require( 'express-session' );

// Configura parametros padrões do AXIOS
axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers = {
    'Content-Type': 'application/json'
};
//axios.defaults.withCredentials = true

// Set EJS engine como default para usar templates html
var app = express()
app.set( 'view engine', 'ejs' )

// Determina a configuração do sistema de sessão
app.use( session( {
    secret: 'acx-node-front-end',
    resave: true,
    saveUninitialized: true
} ) );


// Usa o body-parser para middleware
app.use( cors() )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( {
    extended: true
} ) )

// Grupo de Rotas iniciais do Express
app.use( express.static( path.join( __dirname, 'public' ) ) )

app.use( '/', require( './routes/index.route.js' ) )
app.use( '/user', require( './routes/user.route.js' ) )

// Set a port for the app to listen on
const PORT = process.env.PORT || 5500;

app.listen( PORT, function () {
    console.log( `Rodando na porta: ${PORT}. Press CTRL+C para sair.` )
} );