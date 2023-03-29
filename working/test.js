const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0')
// mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to mongo db...'))
    .catch((err) => console.log('Problem with connection', err));

// mongoose.connect("mongodb://127.0.0.1:27017/playground", {
    // authSource: "admin",
    // user: "mongoadmin",
    // pass: "mongoadmin",
    // family: 4
// })console.log('Problem with connection', err));



const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now()},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'angular course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: false
    })
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// createCourse();