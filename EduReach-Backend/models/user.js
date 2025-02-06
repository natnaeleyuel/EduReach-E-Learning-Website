const mongoose = require('mongoose');

// A SCHEMA IS A BLUEPRINT FOR A MONGOOSE MODEL, THIS IS SHEMA FOR A USER
const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {typr: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, enum: ['user', 'admin'], default: 'student'},
        courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
    }
)


export default mongoose.model('User', userSchema);
