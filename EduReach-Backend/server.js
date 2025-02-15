import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from './configuration/database.js';
import User from './models/user.js';
import Course from './models/course.js';

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();
app.use(cors())

const secret = process.env.SECRET;

// user registration, login and logout
app.post('/api/users/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    try{
        const user = new User({ name, email, hash, role });
        await user.save();
        res.status(201).json(user)
    } 
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/api/users/login', async (req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({
        email: email
    })

    isMatch = bcrypt.compareSync(password, user.hash);
    if (user && isMatch) {
        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, secret, { expiresIn: '1h'})
        res.status(200).json({ user: user.email, token: token})
    }
    else {
        res.status(400).json({ message: 'Invalid email or password'})
    }
})

// course addition
app.post('/api/course/add', async (req, res) => {
    const {title, description, instructor, price, image } = req.body;
    try{
        const course = new Course({ title, description, instructor, price, image })
        await course.save();
        res.status(201).json(course);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.get('/api/users', (req, res) => {
    res.send('Users Route')
    console.log('Users Route')
})

app.get('/api/users/id', (req, res) => {
    res.send('User Route')
    console.log('User Route')
})

app.get('/api/users/all', (req, res) => {
    res.send('All Users Route')
    console.log('All Users Route')
})

app.post('/api/users/update', (req, res) => {
    res.send('Update Route')
    console.log('Update Route')
})

app.post('/api/users/forgotpassword', (req, res) => {
    res.send('Forgot Password Route')
    console.log('Forgot Password Route')
})

app.post('/api/users/resetpassword', (req, res) => {
    res.send('Reset Password Route')
    console.log('Reset Password Route')
})

app.post('/api/users/verify', (req, res) => {
    res.send('Verify Route')
    console.log('Verify Route')
})

app.post('/api/users/verifyemail', (req, res) => {
    res.send('Verify Email Route')
    console.log('Verify Email Route')
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000')
    connectDB();
})