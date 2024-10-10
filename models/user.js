const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/sauravdb");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    image: String 
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;