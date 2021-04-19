const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
    sport: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'sport'
    },
    meal: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'meal'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})


const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;