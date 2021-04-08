const { response } = require('express');

const getUser = ( req, res = response ) => {

    const params = req.query;

    res.json({
        msg: 'Get user - controller',
        params
    });

};

const postUser = ( req, res = response ) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'Post user - controller',
        nombre,
        edad
    });

};

const putUser = ( req, res = response ) => {

    const id = req.params.id;

    res.json({
        msg: 'Put user - controller',
        id: id
    });

};

const patchUser = ( req, res = response ) => {

    res.json({
        msg: 'Patch user - controller'
    });

};

const deleteUser = ( req, res = response ) => {

    res.json({
        msg: 'Delete user - controller'
    });

};

module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
};