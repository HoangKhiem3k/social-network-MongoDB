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

// create group

function createGroup(name,description){
    const newGroup =  new Group({name,description})
    newGroup.save()
    .then(console.log)
    .catch(console.log)
}

// createGroup(
//     "501",
//     "San nhay 666"
// )

// update group : add users to group && add group to user
function addUserToGroup(groupId,userId){
    Group
    .findById(groupId)
    .then(group =>{
        if(!group) return console.log("Group not found")

        // Neu user da co trong group : user da duoc add vao group roi
        let index = -1;
        for(let i=0 ; i < group.userIds.length; i++){
            if(group.userIds[i].equals(userId)){
                index = i;
                return console.log("User already in group");
            }
        }
        //Neu user khong co trong group
        if(index == -1 ){
            // add user vaof group 
            group.userIds.push(userId)
            group.save()
                .then(group => { // add group vao user
                    users.findById(userId)
                        .then(user =>{
                            user.groupIds.push(group._id)
                            return user.save();
                        })
                        .then(console.log)
                        .catch(console.log)
                }) 
            
        }
    }

    )
    .catch(console.log)

}
// addUserToGroup(
//     "62badbeb86d9ed28b3e5f04f",
//     "62ba9452095fd0c1a7c86d57"
// )

// query
// Co groupid , tim tat ca user trog group

function findUsersByGroup(groupId){
    Group
        .findById(groupId)
        .then(group =>{
            if(!group) return console.log("No group found")
            return users
                .find({_id: {$in: group.userIds}})
                .select("username -_id")
        })
        .then(console.log)
        .catch(console.log)
}
// findUsersByGroup("62badbeb86d9ed28b3e5f04f")

// Tim tat ca group ma user do join vao
function findGroupsByUser(userId){
    users
        .findById(userId)
        .then(user =>{
            if(!user) return console.log("No user found")
            return Group
                .find({_id: {$in: user.groupIds}})
                .select("name -_id")
        }
        )
        .then(console.log)
        .catch(console.log)
}
findGroupsByUser("62ba9452095fd0c1a7c86d57")