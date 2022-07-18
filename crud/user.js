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

// Create user
function createUser(username,password,email,name,dateOfBirth){
    users
        .findOne()
        .or([{username},{email}])
        .then(user =>{
            if(user) return console.log('Username or Email exist')
            const newUser = new users({
                username, password, email , name , dateOfBirth
            })
            return newUser.save()
        })
        .then(user => user && console.log(user))
        .catch(console.log)
}

createUser(
    "Huy",
    "admin123",
    "Huy@gmail.com",
    "Quoc Huy",
    "12/02/2000"
)

// update user: findById , findOneAndUpdate
function updateUser(id,username,password,email,name,dateOfBirth){
    users.findById(id)
    .then(user => {
        if(!user) return console.log("User not found")
        user.username = username
        user.password = password
        user.email = email
        user.name = name
        user.dateOfBirth = dateOfBirth

        return user.save()
    })
    .then(console.log)
    .catch(console.log)
}

// updateUser(
//     "62ba93cdf726ab85791af9bf",
//     "Hieu",
//     "Hieu123",
//     "Hieu@gmail.com",
//     "Le Trung Hieu",
//     "02/01/2001"
// )

// delate user
function deleteUser(id){
    users.findByIdAndDelete(id).then(console.log).catch(console.log)
}
// deleteUser("62ba93cdf726ab85791af9bf")