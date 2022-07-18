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

// Like => dislike
function likeAndDislike(postId,userId){
    Post
        .findById(postId)
        .then(post => {
            if(!post){
                return console.log(post)
            }
            var index = -1;
            for(let i = 0; i <post.likes.length; i++) {
                if(post.likes[i].userId.equals(userId)){
                    post.likes.splice(i,1)
                    index = i;
                    break;
                }
            }
            if(index == -1){
                const newLike = new Like({userId})
                post.likes.push(newLike)
            }
            return post.save()
        })
        .then(console.log)
        .catch(console.log)
}
// likeAndDislike(
//     "62bac9bca4ddc08ddfcb63b0",
//     "62bacb06118df13a665546d0"
// )

// query
function findLikes(postId){
    Post
        .findById(postId)
        .then(post => {
            if(!post){
                return console.log("The post does not exist")
            }
            for(let i=0; i< post.likes.length; i++){
                const userId = post.likes[i].userId
                users.findById(userId)
                .select('username -_id')
                .then(console.log)
                .catch(console.log)
            }
        })
}
findLikes("62bac9bca4ddc08ddfcb63b0")