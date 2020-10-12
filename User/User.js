const bcrypt = require('bcrypt');
const saltRounds = 10;

function User() {

    this.name = null;
    this.email = null;
    this.contact = null;
    this.role = null;
    this.userName = null;
    this.password = null;
    this.activated = null;
    this.creationLog = null;
    this.deactLog = null;
    this.devices = null;

    this.toJson = function () {
        return JSON.stringify(this)
    }


}

User.prototype.toJson = function () {
    return JSON.stringify(this);
}

User.prototype.parse = async function (userDetails) {
    var password = await new Promise(resolve => {
        bcrypt.hash(userDetails.password, saltRounds, (err, hash) => {
            if(err) {
                resolve(userDetails.password)
            } else {
                resolve(hash)
            }
        });
    });
   
    this.name = userDetails.name;
    this.email = userDetails.email;
    this.contact = userDetails.contact;
    this.role = userDetails.role;
    this.userName = userDetails.userName;
    this.password = password;
    this.activated = userDetails.activated;
    this.creationLog = userDetails.creationLog;
    this.deactLog = userDetails.deactLog;
    this.devices = userDetails.devices;


}



module.exports = {
    User
}