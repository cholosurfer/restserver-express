const dbValidators = require('./db-validators');
const generateJWT  = require('./generate-jwt');
const googleVerify = require('./google-verify');
const fileUpload   = require('./file-upload');

module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...fileUpload,
};