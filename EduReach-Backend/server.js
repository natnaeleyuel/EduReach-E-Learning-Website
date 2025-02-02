import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

const app =express();

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000')
})

