import app from './src/express.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();
const PORT = process.env.PORT
const MONGODB_URL =process.env.MONGO_URL


mongoose.Promise = global.Promise
console.log("connecting to db...")
mongoose.connect(MONGODB_URL)
console.log("connected")

mongoose.connection.on('error',(err)=>{
    console.log("error: ",err)
    throw new Error(`unable to connect to database: ${MONGODB_URL}`)
})
const server = app.listen(PORT,()=>{
    console.log(`server runing on: http://localhost:${PORT} `)
})

