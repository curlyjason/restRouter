const mongoose = require('mongoose');
const {mongo} = require("mongoose");

mongoose.connect('mongodb://db:27017/mongo-exercises', {
    authSource: "admin",
    user: "mongoadmin",
    pass: "mongoadmin",
})
    .then(() => {
            console.log('Connected to mongo db...');
            // getCourses();
        }
    )
    .catch((err) => console.log('Problem with connection', err));

const courseSchema = new mongoose.Schema({
    tags: [ String ],
    date: { type: Date, default: Date.now()},
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course.
        find().
        or([{price: {$gte: 15}}, {name: /.*by.*/i}]).
        sort('-price').
        select('name author price').
        exec();
}

async function run() {
    const c = await getCourses();
    console.log(c);
}

run();
