const axios = require( 'axios' ).default;

exports.isAuthorized = async ( req, res, next ) => {

    if ( !req.session.user ) {
        const dados = await axios({
            method: 'POST',
            url: '/Login/getOptionLogin',
            params: {usuario: 'hugo.falcao',
                     senha: 'hugo@123',},
            responseType: 'json'
        })
        console.log(dados)
        return res.redirect( '/login' )
        next();

    } else {
        res.locals.user = req.session.user;
        next();
    }
}