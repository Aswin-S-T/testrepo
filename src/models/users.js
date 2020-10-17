/*globals require, module */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

// filter returned values on requests
const returnFilter = (obj) => {
    let tmp = { ...obj }
    tmp.password = undefined
    tmp.__v = undefined
    return tmp
}

let UserSchema = new Schema({
    name: { type: String, required: true, max: 100 }, // User name
    
}, { timestamps: true });

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', function (next) {
    const user = this
    user.updatedDate = Date.now()
    next()
})

UserSchema.pre('update', function (next) {
    const user = this
    user.updatedDate = Date.now()
    next()
})

UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    return returnFilter(userObject)
}
UserSchema.statics.returnFilter = returnFilter

// Export the model
module.exports = mongoose.model("User", UserSchema);