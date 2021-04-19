const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
    name: String
})


const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;