require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());

async function connect() {
  await mongoose.connect(process.env.MONGO_DB);
}

connect().catch((error) => console.log(error));

require('./api')(app);

let port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server started on port ' + port));
