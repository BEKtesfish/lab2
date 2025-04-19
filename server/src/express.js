import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import route from './routes/index.js'
const  app = express()

app.use(cors())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(helmet())
app.use('/',route)
/*app.get("/",(req,res)=>{
    res.send("hello")
})*/
export default app