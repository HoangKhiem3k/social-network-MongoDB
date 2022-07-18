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

// create Comments
function createComment(postId, userId,content){
    Post
        .findById(postId)
        .then(post =>{
            if(!post) return console.log("The post does not exist")
            const newComment =  new Comment({postId, userId,content})
            return newComment.save()
        })
        .then(console.log)
        .catch(console.log)
}
// createComment(
//     "62bac9bca4ddc08ddfcb63b0",
//     "62ba9452095fd0c1a7c86d57",
//     "Hay qua"
// )

// Query Comments
function queryComment(postId){
    Comment.aggregate()
    .facet({
        post:[
            // { // Phân trang
            //     $skip: 2
            // },
            // {
            //     $limit: 2 // Số lượng comments mỗi trang
            // },
            {
                $bucketAuto: {
                    groupBy: '$postId',
                    buckets: 2,
                    output: {
                        comments: {$push:{content: '$content'}}
                    }
                }
            }
        ]
    }).then(comments => console.log(JSON.stringify(comments,undefined, 2))).catch(console.error)
}
// queryComment("62bac9bca4ddc08ddfcb63b0")

//Update comment
function updateComment(commentId, content){
    Comment
        .updateOne({_id: commentId},{
            $set: {content}
        })
        .then(console.log)
        .catch(console.log)
}
// updateComment("62bad7948254e48d983501b9","Khong hay")

// Delete comment

function deleteComment(commentId){
    Comment
        .deleteOne({_id: commentId})
        .then(console.log)
        .catch(console.log)
}
deleteComment("62bad7948254e48d983501b9")