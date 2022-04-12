const {
    default: axios
} = require( 'axios' );
const usersModel = require( '../model/users' );
const emp_estabModel = require( '../model/emp_estab' );

/**
 * Requisição Express
 * Realiza o login do usuário criando a sessão e adicionando o parâmetro Authorization no header do axios
 * @param {*} req 
 * @param {*} res 
 * 
 */
exports.Login = async ( req, res ) => {
    const dados = await usersModel.Auth( req.body.usuario, req.body.senha, req.body.empresa, req.body.estabelecimento );
    console.log(dados);
    // if ( dados.data.token.length > 0 ) {
    //     axios.defaults.headers.Authorization = 'Bearer ' + dados.data.token;

    //     req.session.user = dados.data;
    //     const context = {
    //         title: "Login",
    //         data: dados.data,
    //     };
    //     res.redirect( "/" );
    // } else {
    //     res.redirect( '/login' );
    // }
};

exports.Logout = ( req, res ) => {
    req.session.destroy();
    res.redirect( '/login' );
};

exports.Lista = async ( req, res ) => {
    const dados = {
        title: "Lista de Usuários",
        data: await usersModel.Lista()
    }
    res.render( 'teste/list', dados );
}

exports.GetEmpEstab = async ( req, res) => {
    console.log(req.body)
    const dados = await emp_estabModel.GetEmpEstab(req.body.login, req.body.senha);
    console.log(dados);
    res.send(dados); 
    //console.log(dados);
}