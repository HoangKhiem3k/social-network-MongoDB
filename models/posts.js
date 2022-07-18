const mongoose = require('mongoose')
const {LikeSchema} = require('./likes')

const PostSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    title: {type: String, required: true},
    content: {type: String, required: true},
    likes: {
        type: [LikeSchema],
    },
    // comments: {} : thục hiện bucketing
})
const Post = new mongoose.model('Post', PostSchema);

module.exports = {
    PostSchema,Post
}