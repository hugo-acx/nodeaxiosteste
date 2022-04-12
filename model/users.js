const axios = require( 'axios' ).default;
const webservice = require( '../middlewares/webservice' );

exports.Auth = async ( login, pass, emp, estab ) => {
    console.log(login);
    console.log(pass);
    var dados = {
        login: login,
        senha: pass,
        empresa: 3,
        estabelecimento: 1 
    };
    return webservice.Webservice("POST", "Login", "getAuthorizeUser", dados);
}

exports.Lista = async () => {
    const lista = await axios.get( '/user/listaUser' );
    if ( lista.data.length > 0 ) {
        return lista.data;
    } else {
        return [];
    }
}