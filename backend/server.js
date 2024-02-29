const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api/users', userRoutes)

app.listen('8003', () => {
    console.log('connected to port 8003');
})