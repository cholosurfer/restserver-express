const { response } = require("express");

const isAdminRole = ( req, res = response, next ) => {

    if( !req.user ) {
        return res.status(500).json({
            msg: 'Attempt to validate user role before validate user token'
        });
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } is not Administrator - can't perform this action`
        });
    }

    next();
};

const hasRole = ( ...roles ) => {

    return ( req, res = response, next ) => {

        if( !req.user ) {
            return res.status(500).json({
                msg: 'Attempt to validate user role before validate user token'
            });
        }

        if( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `Service require one of these roles ${ roles } `
            });
        }

        next();
    };
};

module.exports = {
    isAdminRole,
    hasRole
};