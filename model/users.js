const axios = require( 'axios' ).default;
const webservice = require( '../middlewares/webservice' );

exports.Auth = async ( login, pass, empresa, estabelecimento ) => {
        await axios({
            method: 'POST',
            url: 'Login/getAuthorizeUser',
            data: {login: login,
                     senha: pass,
                     empresa: empresa,
                     estabelecimento: estabelecimento},
            responseType: 'json'
        })
        .then(function (retorno) {
            // manipula o sucesso da requisição
            console.log(retorno.data);
            return retorno.data;
        })
        .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
        })
        //     .then(function () {
        //     // sempre será executado
        // });
}

exports.Lista = async () => {
    const lista = await axios.get( '/user/listaUser' );
    if ( lista.data.length > 0 ) {
        return lista.data;
    } else {
        return [];
    }
}