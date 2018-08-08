const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Data = new Schema({
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
    author: String
},{
    collection: 'data'
});

module.exports = mongoose.model('Data', Data);

