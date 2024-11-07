const express = require('express');
require('dotenv').config();

const db = require('./src/config/database');
const router = require('./src/Route/index');

const app = express();
const port = process.env.PORT || 8080

app.use(express.json());
app.use("/", router)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
