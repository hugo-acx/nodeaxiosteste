const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const path = require( 'path' )
const cors = require( 'cors' )
require( 'dotenv/config' );
const axios = require( "axios" ).default;
const session = require( 'express-session' );

// Configura parametros padrões do AXIOS
// axios.interceptors.request.use(function (config) {
//     // Faz alguma coisa antes da requisição ser enviada
//     // return config;
//     console.log("machado 1")
//   }, function (error) {
//     // Faz alguma coisa com o erro da requisição
//     // return Promise.reject(error);
//     console.log("machado 2");
// });

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/x-www-form-urlencoded'
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