const express = require('express');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const routes = require('./routes');
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app = express()
const port = process.env.PORT || 8001
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.options('*', cors());
app.get('/', (req, res) => {
    return res.send("Hello world")
})
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
routes(app)
mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connect to DB success')
    })
    .catch((e) => {
        console.log(e)
    })

app.listen(port, () => {
    console.log(`Server is running on port ${port} http://localhost:${port}`)
})