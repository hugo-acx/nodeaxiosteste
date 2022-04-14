const axios = require( 'axios' ).default;
const webservice = require( '../middlewares/webservice' );

exports.Auth = async ( login, pass, empresa, estabelecimento ) => {
    return await axios({
            method: 'POST',
            url: 'Login/getAuthorizeUser',
            data: {login: login,
                     senha: pass,
                     empresa: empresa,
                     estabelecimento: estabelecimento},
            responseType: 'json'
        })
}

exports.Lista = async () => {
    const lista = await axios.get( '/user/listaUser' );
    if ( lista.data.length > 0 ) {
        return lista.data;
    } else {
        return [];
    }
}