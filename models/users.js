const mongoose = require('mongoose')
const {ProfileSchema} = require('./profile')


const UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    registerDate: {type: Date, default: new Date().getTime()},
    groupIds:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Group' 
    },
    profile: {type: ProfileSchema}
})
const users = new mongoose.model('users', UserSchema);

module.exports = {

    UserSchema , users
}
    // mongoose.models.Customer || mongoose.model('Customer', customerSchema);
