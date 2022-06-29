const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_DATABASE } = process.env

mongoose.connect("mongodb://localhost:27017/resume", () => {
    console.log("connected")
}, e => console.log(e))



const resumeSchema = new mongoose.Schema({

    name: String,
    infomation: Object,
    summary: String,
    skill: Object,
    experience: Object,
    education: Object,


})

module.exports =
    { Resume: mongoose.model('Resume', resumeSchema) }