const mongoose = require('mongoose');  
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
try{
    console.log("Connected to MongoDB");
}catch(err){
    console.log('Error connecting to MongoDB', err);
};


// comment:
const commentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    content: {type: String, required: true},
})
const Comment = mongoose.model('Comment', commentSchema);

// Tạo schema cho bài post :
const postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    comments: {
        type: [commentSchema],
    }
})
const Post = mongoose.model('Post', postSchema);


const comment1 = new Comment({
    username: 'Khiem',
    content: 'Khiem greater Post ever'
})
const comment2 = new Comment({
    username: 'Hieu',
    content: 'Hieu greater Post ever'
})
const newPost = new Post({
    title: 'Vn vs Philip',
    content: 'VN win 3-1 vs Philip',
    comments: [comment1, comment2]
})

newPost.save().then(console.log).catch(console.error)




