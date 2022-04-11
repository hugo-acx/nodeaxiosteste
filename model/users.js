const axios = require( 'axios' ).default;

exports.Auth = async ( login, pass ) => {
    console.log(login);
    console.log(pass);
    // return await axios.post( '/Login/getAuthorizeUser', {
        // login: login,
        // senha: pass,
        // empresa: 3,
        // estabelecimento: 1 
    // } );
    return await axios({
            method: 'POST',
            url: '/Login/getAuthorizeUser',
            params: {login: login,
                senha: pass,
                empresa: 3,
                estabelecimento: 1},
            responseType: 'json'
        })
        // .then(function (retorno) {
        //     // manipula o sucesso da requisição
        //     console.log(retorno.data);
        // })
        // .catch(function (error) {
        //     // manipula erros da requisição
        //     console.error(error);
        // })
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