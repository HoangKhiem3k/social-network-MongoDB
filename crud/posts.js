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

// create Post
function createPost(userId,title,content){
    users.findById(userId)
    .then(user => {
        if(!user) return console.log("User does not exist")
        const newPost = new Post({
            userId,title,content
        })

        return newPost.save()
    })
    .then(console.log)
    .catch(console.log)
}
createPost(
    "62ba9452095fd0c1a7c86d57",
    "Post 1",
    "VN win the world cup"
)

// Update Post
function updatePost(postId,title,content){
    Post.updateOne({_id:postId},{
        $set: {
            title,content
        }
    })
    .then(console.log)
    .catch(console.log)
}
// updatePost(
//     "62bac1324b40b59ed172f4c0",
//     "Post 2",
//     "I am a student at Duy Tan University"
// )

//Delete post
function deletePost(postId){
    Post.findOneAndDelete({_id: postId})
    .then(console.log)
    .catch(console.log)
}
// deletePost("62bac1324b40b59ed172f4c0")
// Query 
// Post.find()
//     .populate('userId')
//     .then(console.log)
//     .catch(console.log)