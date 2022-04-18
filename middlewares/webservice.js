const axios = require( 'axios' ).default;

exports.Webservice = async (metodo, controller, funcao, dados = null) => {
    var _retorno = { status: false, msg: "", erro: "Não foi possivel consultar o webservice. Tente novamente mais tarde!" };
    return await axios({
            method: metodo,
            url: `/${controller}/${funcao}`,
            // baseURL: url,
            //data: (dados == null) ? {} : dados,
            params: (dados == null) ? {} : dados,
            responseType: 'json'
        })
        .then(function (retorno) {
            // manipula o sucesso da requisição
            _retorno = retorno.data;
        })
        .catch(function (error) {
            // manipula erros da requisição
            console.error(error);
        })
            .then(function () {
            // sempre será executado
        });
}