const express = require( 'express' );
const router = express.Router();
const userController = require( '../controllers/users' );
const consultasController = require( '../controllers/consultas' );
const Auth = require( '../middlewares/auth' );

//Rota inicial que verifica se o usuário já está logado
router.get( '/', Auth.isAuthorized, function ( req, res ) {
    res.render( 'index', {
        title: "Página Inicial"
    } );
} );

router.get( '/login', ( req, res ) => {
    res.render( 'login', {
        title: "Página de Login"
    } );
} );

router.post( '/consultas/insert', consultasController.InsertConsulta );
router.get( '/consultas/list', consultasController.GetAllConsultas );
router.put( '/consultas/update', consultasController.UpdateConsulta );
router.post( '/consultas/delete', consultasController.DeleteConsulta );

//Rota que retorna empresa e estabelecimento após o usuário digitar login e senha
router.post( '/login/list/selects', userController.GetEmpEstab)

// Rota para encerrar sessoes ativa aprtir da tela de login
router.post( '/solicEncerraSessoes', userController.Solic );

router.post( '/login', userController.Login );

router.get( '/logout', userController.Logout );

module.exports = router;