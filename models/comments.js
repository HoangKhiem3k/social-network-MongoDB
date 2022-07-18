const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    content: {type: String, required: true},
    createDate: {type: Date,default: new Date().getTime()},
})
const Comment = new mongoose.model('Comment', CommentSchema);

module.exports = {
    CommentSchema,Comment
}