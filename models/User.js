const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    tokens:[]
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;