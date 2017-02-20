const crypto = require('crypto');
const key = 'JxJayden';

module.exports = {
    encrypt: function(value) {
        value = value.toString();
        let cipher = crypto.createCipher('aes-256-cbc', key);
        let text = value;
        let crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },
    decrypt: function(value) {
        let decipher = crypto.createDecipher('aes-256-cbc', key);
        let dec = decipher.update(value, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
}
