const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    author: {
        type: String
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Notice=mongoose.model('Notice',noticeSchema);

module.exports={Notice}