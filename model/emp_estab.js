const axios = require( 'axios' ).default;

exports.GetEmpEstab = async ( login, pass ) => {
    const dados =  await axios({
            method: 'POST',
            url: '/Login/getOptionLogin',
            params: {usuario: login,
                     senha: pass},
            responseType: 'json'
        });

    return dados.data;
}