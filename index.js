const express = require('express');
require('dotenv').config();

const db = require('./src/config/database');
const router = require('./src/Route/index');

const app = express();
const port = process.env.PORT || 8080

app.use(express.json());

app.use((err, req, res, next) => {
    if (!err) return next();

    res.status(500);
    res.send('500: Internal server error');
});

// Middleware to parse form-urlencoded data (optional, for POST forms)
app.use(express.urlencoded({ extended: true }));
// console.log(__dirname, "aa");
// app.use(express.static(__dirname + '/src/public'));
app.use("/", router)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
