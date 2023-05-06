const express = require('express');
const { Notice } = require('../models/notice');

const {ObjectId}=require('mongodb')

const noticeRouter = express.Router();

noticeRouter.get('/api/get', async (req, res) => {
    try {
        let allNotice = await Notice.find();
        res.status(200).send({ 'Message': "All Notices", "Noices": allNotice })
    } catch (error) {
        res.status(400).send({ "Message": error.message });
        console.log(error);
    }
});

noticeRouter.post('/api/create', async (req,res) => {
    let { author, title, desc, date } = req.body;
    try {
        let newNotice =Notice({ author, title, desc, date });
        // console.log(newNotice);
        await newNotice.save();
        res.status(200).send({ 'Message': "New Notice created",'Notice':newNotice})
    } catch (error) {
        res.status(400).send({ "Message": error.message });
        console.log(error);
    }
});

noticeRouter.patch('/api/update/:id', async (req, res) => {
    const payload = req.body;
    let id = new ObjectId(req.params.id);
    try {
        await Notice.findByIdAndUpdate({ '_id': id }, payload);
        const notice = await Notice.findOne({ '_id': id })
        res.status(201).send({ 'Message': 'Notice is Updates', "Notice": notice })
    } catch (error) {
        res.status(400).send({ "Message": error.message });
        console.log(error);
    }
});

noticeRouter.delete('/api/update/:id', async (req, res) => {
    // const payload = req.body;
    let id = new ObjectId(req.params.id);
    try {
        await Notice.findByIdAndDelete({ '_id': id });
        // const notice = await Notice.findOne({ '_id': id })
        res.status(201).send({ 'Message': 'Notice is Deleted' })
    } catch (error) {
        res.status(400).send({ "Message": error.message });
        console.log(error);
    }
});

module.exports={noticeRouter}
