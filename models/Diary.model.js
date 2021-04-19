const mongoose = require('mongoose');

const diarySchema = mongoose.Schema({
    name: {
        
    }
})


const Diary = mongoose.model('Diary', userSchema);

module.exports = Diary;