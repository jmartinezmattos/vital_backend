const crypto = require('crypto');

function generatePassword(password){
    var salt = crypto.randomBytes(32).toString('hex');//genero un salt
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');//genero un hash

    return{
        salt: salt,
        hash: genHash
    }

}

function validPassword(password, hash, salt){
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');//genero el hash
    return hash === hashVerify;//me fijo si el hash nuevo es igual al que esta en la bdd que se genero en la funcion de generatePasword
}

module.exports.validPassword = validPassword;
module.exports.generatePassword = generatePassword;