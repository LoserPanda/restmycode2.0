const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Data = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    descript: String,
    lang: String,
    date: {
        type: Date,
        default: Date.now
    },
    tags: [String],
    score: Number,
    code: String,
    author: String,
    comments: {
        type: [{
            author: {type: Schema.Types.ObjectId, ref: 'User'},
            comment: {type: Schema.Types.ObjectId, ref: 'Comment'}
        }],
    }
},{
    collection: 'data'
});

module.exports = mongoose.model('Data', Data);

