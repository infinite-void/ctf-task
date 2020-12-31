const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MONGO_URI');  
const dotenv = require('dotenv');

dotenv.config();
const app = express();


const authRoutes = require('./routes/auth');
const utilRoutes = require('./routes/utilities');

app.use(express.json());
app.use(express.urlencoded({ 
        extended: false 
}));

app.use('/api/auth', authRoutes);
app.use('/api/util', utilRoutes);

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => console.log(error));


const port = process.env.PORT;

app .listen(port, 'localhost', () => {
        console.log(`Listening on localhost:${port}`);
});