const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Comments = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    author: String,
    comment: {
        type: [{
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            comment: String
        }]
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    collection: 'comments'
});

module.exports = mongoose.model('Comments', Comments);

