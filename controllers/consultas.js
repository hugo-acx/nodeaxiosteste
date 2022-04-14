const consultas = require( '../model/consultas' );

/**
 * Requisição Express
 * Realiza o login do usuário criando a sessão e adicionando o parâmetro Authorization no header do axios
 * @param {*} req 
 * @param {*} res 
 * 
 */

exports.InsertConsulta = async ( req, res) => {
    const dados = await consultas.InsertConsulta(req.body.cod, req.body.apelido, req.body.query);
    res.send(dados);
    // return dados;
}

exports.GetAllConsultas = async ( req, res) => {
    const dados = await consultas.GetAllConsultas();
    res.send(dados);
    // return dados;
}

exports.GetConsulta = async ( req, res) => {
    const dados = await consultas.GetConsulta();
    res.send(dados);
    // return dados;
}

exports.UpdateConsulta = async ( req, res) => {
    const dados = await consultas.UpdateConsulta(req.body.cod, req.body.apelido, req.body.query);
    res.send(dados);
    // return dados;
}

exports.DeleteConsulta = async ( req, res) => {
    const dados = await consultas.DeleteConsulta(req.body.cod, req.body.apelido, req.body.query);
    res.send(dados);
    // return dados;
}