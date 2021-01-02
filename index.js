const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MONGO_URI');  
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();


const authRoutes = require('./routes/auth');
const utilRoutes = require('./routes/utilities');

app.use(express.json());
app.use(express.urlencoded({ 
        extended: false 
}));
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/util', utilRoutes);

app.get('/', (req, res) => {
        res.sendFile('views/index.html', {root: __dirname });
});

app.get('/main', (req, res) => {
        res.sendFile('views/main.html', {root: __dirname });
});

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).
  catch(error => console.log(error));

app .listen(process.env.PORT, '0.0.0.0' , 'localhost', () => {
       console.log('listening');
});