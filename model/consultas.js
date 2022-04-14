const axios = require( 'axios' ).default;

exports.InsertConsulta = async (cod, apelido, query) => {
    const dados = await axios({
        method: 'POST',
        url: '/ConsultaCustomizada/insert',
        params: {"token": "8SN1!o2Q_fCA6Gv0gXlc"},
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
        params: {"token": "8SN1!o2Q_fCA6Gv0gXlc"},
        responseType: 'json'
    });
    return dados.data;
}

exports.GetConsulta = async () => {
    const dados = await axios({
        method: 'POST',
        url: '/ConsultaCustomizada/consulta',
        params: {"token": "8SN1!o2Q_fCA6Gv0gXlc"},
        responseType: 'json'
    });
    return dados.data;
}

exports.UpdateConsulta = async (cod, apelido, query) => {
    const dados = await axios({
        method: 'put',
        url: '/ConsultaCustomizada/update',
        params: {"token": "8SN1!o2Q_fCA6Gv0gXlc"},
        data: {"cod_consulta": cod,
                 "apelido_consulta": apelido,
                 "query": query},
        responseType: 'json'
    });
    return dados.data;
}

exports.DeleteConsulta = async (cod, apelido, query) => {
    const dados = await axios({
        method: 'delete',
        url: '/ConsultaCustomizada/delete',
        params: {"token": "8SN1!o2Q_fCA6Gv0gXlc"},
        data: {"cod_consulta": cod,
                 "apelido_consulta": apelido,
                 "query": query},
        responseType: 'json'
    });
    return dados.data;
}