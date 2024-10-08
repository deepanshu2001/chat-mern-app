import express from 'express'
import path from 'path'
import {app,server} from './socket/socket.js'
import connectDB from './db/db.js';
import dotenv from 'dotenv'
import authRoutes from '../backend/routes/authroutes.js'
import messageRoutes from '../backend/routes/messageRoutes.js'
import userRoutes from '../backend/routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import protectRoute from './middleware/protectRoute.js';
dotenv.config();
const PORT=process.env.PORT;
const __dirname=path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use('/api/messages',protectRoute,messageRoutes);
app.use('/api/users',protectRoute,userRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})
server.listen(PORT,()=>{
    connectDB()
    console.log('App Listening on port '+PORT)
})