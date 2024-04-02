const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
require('./libs/dbConnect')();

const userRoutes = require('./routes/user');
const studentRoutes = require('./routes/students')

//Used to parse incoming requests data
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    credentials: false,
  })
);


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/student', studentRoutes);


app.get('/', (req, res) => {
  res.send('Server is running and up....');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}
);
