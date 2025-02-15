// A SCHEMA IS A BLUEPRINT FOR A MONGOOSE MODEL, THIS IS SHEMA FOR A COURSE
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        price: {type: Number, required: true},
        image: {type: String, required: true},
        enrolledStudents: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        reviews: [
            {
                name: {type: String, required: true},
                rating: {type: Number, required: true},
                Comment: {type: String, required: true},
            }
        ]
    } 
)

export default mongoose.model('Course', courseSchema);
