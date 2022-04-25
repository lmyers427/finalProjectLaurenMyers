const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const connectDB = require('./model/config/dbConn');

//Connect to MongoDb
connectDB();

//Static Files; might not need this
app.use('/', express.static(path.join(__dirname, '/public')));


//routes
app.use('/', require('./routes/root'));
app.use('/states', require('./routes/api/states'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

mongoose.connection.once('open', () => {

    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

