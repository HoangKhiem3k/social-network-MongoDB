const mongoose = require('mongoose')


const LikeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})
const Like = new mongoose.model('Like', LikeSchema);

module.exports = {
    LikeSchema,Like
}