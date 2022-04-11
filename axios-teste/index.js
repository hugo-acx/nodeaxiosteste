const axios = require("axios");
const url = "http://localhost:50001/";

async function webservice(metodo, controller, funcao, dados = null){
    await axios({
            method: metodo,
            url: `/${controller}/${funcao}`,
            baseURL: url,
            //data: (dados == null) ? {} : dados,
            params: (dados == null) ? {} : dados,
            responseType: 'json'
        }).then(function (retorno) {
            // manipula o sucesso da requisição
            console.log(retorno.data);
        })
        .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
        })
            .then(function () {
            // sempre será executado
        });
}

//webservice('get', 'Parametros', 'GetAllParametros', null);
webservice('get', 'Parametros', 'GetParametro', {nom_parametro: 'forma_pagamento'});