const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for User
let User = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
        },
        studentIds: {
            type: Array,
        },
        batches: {
            type: Array
        },
    },
    {
        collection: 'users'
    }
);

module.exports = mongoose.model('User', User);