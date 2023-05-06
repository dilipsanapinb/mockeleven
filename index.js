const express=require('express');
const { connection } = require('./config/db');
const { noticeRouter } = require('./routes/notice');

const cors=require('cors')

require('dotenv').config();

const app = express();

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Welcome to Trello Boar App")
});

app.use('/notice',noticeRouter)



app.listen(process.env.port, async() => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log({ 'Error': error.message });
        console.log(error);
    }
    console.log(`Server is connected to ${process.env.port}`);
})