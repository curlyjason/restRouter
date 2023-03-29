const mongoose = require('mongoose');

mongoose.connect('mongodb://db:27017/playground', {
    authSource: "admin",
    user: "mongoadmin",
    pass: "mongoadmin",
})
    .then(() => {
            console.log('Connected to mongo db...');
            createCourse();
        }
    )
    .catch((err) => console.log('Problem with connection', err));

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