require('dotenv').config();
const mongoose = require('mongoose');


const db = mongoose.connection;
const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Connected to DB');
    });
};

module.exports = dbConnect;