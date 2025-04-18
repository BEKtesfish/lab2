import app from './src/express.js'
import dotenv from 'dotenv'
dotenv.config();
const PORT = process.env.PORT

const server = app.listen(PORT,()=>{
    console.log(`server runing on: http://localhost:${PORT} `)
})

