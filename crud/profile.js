const mongoose = require('mongoose');  

// load model
const {users} = require('../models/users')
const {Profile} = require('../models/profile')
const {Group} = require('../models/groups')
const {Post} = require('../models/posts')
const {Comment} = require('../models/comments')
const {Like} = require('../models/likes')




mongoose.connect('mongodb://localhost:27017/social-network', { useNewUrlParser: true })
try{
    console.log("Connected to MongoDB");
}catch(err){
    console.log('Error connecting to MongoDB', err);
};

// create Profile
function createProfile(userId, university,major,social,description){
    users.findById(userId)
    .then(user => {
        if(!user) return console.log("User does not exist")
        if(user.profile) return console.log("Profile already exists")
        const newProfile = new Profile({
            university,major,social,description
        })
        user.profile = newProfile

        return user.save()
    })
    .then(console.log)
    .catch(console.log)
}
// createProfile(
//     "62ba9452095fd0c1a7c86d57",
//     ["Duy Tan"],
//     ["web","mobile"],
//     {
//         facebook: "https://www.facebook.com/duytan.nguyen.9",
//         instagram: null
//     },
//     "I am a student at Duy Tan University"
// )

// Update Profile
function updateProfile(userId, university,major,social,description){
    users.findById(userId)
    .then(user => {
        if(!user) return console.log("User does not exist")
        if(!user.profile) return console.log("Profile does not already ")
        const updatedProfile = new Profile({
            university,major,social,description
        })
        user.profile = updatedProfile

        return user.save()
    })
    .then(console.log)
    .catch(console.log)
}
// updateProfile(
//     "62ba9452095fd0c1a7c86d57",
//     ["Duy Tan"],
//     ["web","mobile"],
//     {
//         facebook: "https://www.facebook.com/9",
//         instagram: "https://instagram.com/"
//     },
//     "I am a student at Duy Tan University"
// )

//Delete profile
function deleteProfile(userId){
    users.findById(userId)
    .then(user => {
        if(!user) return console.log("User does not exist")
        if(!user.profile) return console.log("Profile does not already ")
        
        user.profile = null

        return user.save()
    })
    .then(console.log)
    .catch(console.log)
}
deleteProfile("62ba9452095fd0c1a7c86d57")