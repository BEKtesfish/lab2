import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
const  app = express()

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(helmet())
app.get("/",(req,res)=>{
    res.send("hello")
})
export default app