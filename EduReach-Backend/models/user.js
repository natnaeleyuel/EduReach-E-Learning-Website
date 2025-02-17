// A SCHEMA IS A BLUEPRINT FOR A MONGOOSE MODEL, THIS IS SHEMA FOR A USER
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        hash: {type: String, required: true},
        role: {type: String, enum: ['user', 'admin', 'student', 'instructor'], default: 'student'},
        courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
    }, 
    {
        timestamps: true
    }
)

// Exclude the password hash from the response
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.hash;
    return user;
}

export default mongoose.model('User', userSchema);
