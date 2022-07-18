const mongoose = require('mongoose')
const ProfileSchema = mongoose.Schema({
    university: {type: [String]},
    major: {type: [String]},
    social:{
        facebook: {type: String},
        instagram: {type: String},
    },
    description: {type: String},

})
const Profile = new mongoose.model('Profile', ProfileSchema);

module.exports = {
    ProfileSchema,Profile
}