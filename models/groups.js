const mongoose = require('mongoose')


const GroupSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    userIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref:'User'
    }
})
const Group = new mongoose.model('Group', GroupSchema);

module.exports = {
    GroupSchema,Group
}