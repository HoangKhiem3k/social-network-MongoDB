const mongoose = require('mongoose');  
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
try{
    console.log("Connected to MongoDB");
}catch(err){
    console.log('Error connecting to MongoDB', err);
};

// Tạo schema cho bài post :
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true}
})
const Post = mongoose.model('Post', postSchema);
// comment:
const commentSchema = new mongoose.Schema({
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    username: {type: String, required: true},
    content: {type: String, required: true},
})
const Comment = mongoose.model('Comment', commentSchema);

// // Tạo mới

// const newPost = new Post({
//     title: 'Introduction to MongoDB',
//     content: 'Hello, MongoDB!',
// })
// newPost.save().then(console.log).catch(console.error)

// const comment1 = new Comment({
//     postId: newPost._id,
//     username: 'khiem',
//     content: 'khiem greater Post ever'
// })
// comment1.save().then(console.log).catch(console.error)
// const comment2 = new Comment({
//     postId: newPost._id,
//     username: 'hieu',
//     content: 'hieu greater Post ever'
// })
// comment2.save().then(console.log).catch(console.error)
// const comment3 = new Comment({
//     postId: newPost._id,
//     username: 'huy',
//     content: 'huy greater Post ever'
// })
// comment3.save().then(console.log).catch(console.error)
// const comment4 = new Comment({
//     postId: newPost._id,
//     username: 'tuan',
//     content: 'tuan greater Post ever'
// })
// comment4.save().then(console.log).catch(console.error)


// Query
// Comment.find()
// .populate('postId') // Thêm thông tin bài post vào api
// .then(console.log)
// .catch(console.error)

Comment.find()
.populate('postId','title -_id') // Thêm thông tin bài post: (chỉ có title,loại id ra) vào api
.then(console.log)
.catch(console.error)











