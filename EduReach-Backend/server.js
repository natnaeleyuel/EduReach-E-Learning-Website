import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from './configuration/database.js';
import User from './models/user.js';
import Course from './models/course.js';
import BlacklistedToken from './models/blacklistedToken.js';
import limiter from './middleware/ratelimiter.js';
import isEmailValid from './modules/deep-email-validator.js';

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();
app.use(cors())

const secret = process.env.SECRET;

// rate limiter
app.use(limiter);

// user information
// user registration, login and logout
app.post('/api/users/register', async (req, res) => {
    
    try{
        const { name, email, password, role } = req.body;
        const { valid, reason, validators } = await isEmailValid(email);
        if(!valid) {
            return res.status(400).json({ message: 'Invalid email address', reason: validators[reason] });
        }
        const hash = bcrypt.hashSync(password, 10);

        const user = new User({ name, email, hash, role });
        await user.save();
        res.status(201).json(user)
    } 
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.post('/api/users/login', async (req, res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({
            email: email
        })

        const isMatch = bcrypt.compareSync(password, user.hash);
        if (user && isMatch) {
            const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, secret, { expiresIn: '1h'})
            res.status(200).json({ user: user.email, token: token})
        }
        else {
            res.status(400).json({ message: 'Invalid email or password'})
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error.message)
    }
    
})

app.post('/api/users/logout', async (req, res) => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log(authHeader);
            return res.status(400).json({ message: 'User not logged in' });
        }

        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, secret);
        const expiresAt = new Date(decode.exp * 1000);
        const blacklistedToken = new BlacklistedToken({ token, expiresAt });
        await blacklistedToken.save();
        res.status(200).json({ message: 'User logged out' });
    }    
    catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }  
})

// token verification
app.post('/api/users/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log(authHeader);
            return res.status(400).json({ message: 'User not logged in' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        const blacklistedToken = await BlacklistedToken.findOne({ token });
        if ( blacklistedToken ) {
            return res.status(401).json({ message: 'User logged out' })
        }
        res.status(200).json(decoded)
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid token'})
        console.log(error.message)
    }
})

// User information
app.get('/api/users', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            console.log(authHeader);
            return res.status(400).json({ message: 'User not logged in' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        const user = await User.findOne({ email: decoded.email});
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error.message);
    }
})



// course information
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

app.post('/api/users/verifyemail', (req, res) => {
    res.send('Verify Email Route')
    console.log('Verify Email Route')
})

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000')
    connectDB();
})