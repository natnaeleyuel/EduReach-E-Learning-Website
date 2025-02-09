import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './configuration/database.js';


const app =express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();
app.use(cors())



app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000')
    connectDB();
})

app.get('/', (req, res) => {
    res.send('API is running') 
    console.log('API is running')
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

app.get('/api/users/resetpassword', (req, res) => {
    res.send('Reset Password Route')
    console.log('Reset Passsword Route')
})

app.get('/api/users/logout', (req, res) => {
    res.send('Logout Route')
    console.log('Logout Route')
})

// app.get('/api/users/profile', (res, res) => {
//     res.send('Profile Route')
//     console.log('Profule Route')
// })

app.get('/api/users/update', (req, res) => {
    res.send('Update Route')
    coosole.log('Update Route')
})

app.getMaxListeners('/api/users/delete', (req, res) => {
    res.send('Delete Route')
    console.log('Delete Route')
})

app.post('/api/users/login', (req, res) => {
    res.send('Login Route')
    console.log('Login Route')
})

app.post('/api/users/register', (req, res) => {
    res.send('Register Route')
    console.log('Register Route')
})

app.post('/api/users/profile', (req, res) => {
    res.send('Profile Route')
    console.log('Profile Route')
})

app.post('/api/users/update', (req, res) => {
    res.send('Update Route')
    console.log('Update Route')
})

app.post('/api/users/delete', (req, res) => {
    res.send('Delete Route')
    console.log('Delete Route')
})

app.post('/api/users/logout', (req, res) => {
    res.send('Logout Route')
    console.log('Logout Route')
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
