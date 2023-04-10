const mongoose = require('mongoose');
const {mongo} = require("mongoose");

// function importRecords() {
//     import
//
// }

mongoose.connect('mongodb://db:27017/playground', {
    authSource: "admin",
    user: "mongoadmin",
    pass: "mongoadmin",
})
    .then(() => {
            console.log('Connected to mongo db...');
        }
    )
    .catch((err) => console.log('Problem with connection', err));

const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.length > 0;
                    // console.log(callback);
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        },
    },
    date: { type: Date, default: Date.now()},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Make a book',
        author: 'Don',
        // tags: ['handWork'],
        category: 'network',
        isPublished: false
    })
    try {
        const result = await course.save();
        console.log(result);
    } catch (e) {
        console.log(e.message);
    }
}

async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

async function updateCourseWithQuery(id) {
    const course = await Course.findById(id);
    if (!course) {
        console.log('Cannot find course');
        return;
    }

    course.set({
        isPublished: true,
        author: 'Another Author'
    })

    const result = await course.save();

    console.log(result);
}

async function updateCourse(id) {
    const result = await Course.findOneAndUpdate({_id: id},{
        $set: {
            author: "Jason 2 Electric Boogaloo",
            isPublished: false
        }
    }, {new: true})
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({_id: id});
    console.log(result);
}

// removeCourse('643089b09f5a37559686c261');

createCourse();