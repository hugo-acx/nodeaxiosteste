const axios = require( 'axios' ).default;

exports.InsertConsulta = async (cod, apelido, query) => {
    const dados = await axios({
        method: 'POST',
        url: '/ConsultaCustomizada/insert',
        params: {"token": "i0SLRL4}znNwvIZHlRE4x5wVjTaUOQJ_MqlKdkuFUtJ"},
        data: {"cod_consulta": cod,
               "apelido_consulta": apelido,
               "query": query},
        responseType: 'json'
    });
    return dados.data;
}

exports.GetAllConsultas = async () => {
    const dados = await axios({
        method: 'GET',
        url: '/ConsultaCustomizada/consulta',
        params: {"token": "i0SLRL4}znNwvIZHlRE4x5wVjTaUOQJ_MqlKdkuFUtJ"},
        responseType: 'json'
    });
    return dados.data;
}

exports.GetConsulta = async () => {
    const dados = await axios({
        method: 'POST',
        url: '/ConsultaCustomizada/consulta',
        params: {"token": "i0SLRL4}znNwvIZHlRE4x5wVjTaUOQJ_MqlKdkuFUtJ"},
        responseType: 'json'
    });
    return dados.data;
}

exports.UpdateConsulta = async (cod, apelido, query) => {
    const dados = await axios({
        method: 'put',
        url: '/ConsultaCustomizada/update',
        params: {"token": "i0SLRL4}znNwvIZHlRE4x5wVjTaUOQJ_MqlKdkuFUtJ"},
        data: {"cod_consulta": cod,
                 "apelido_consulta": apelido,
                 "query": query},
        responseType: 'json'
    });
    return dados.data;
}