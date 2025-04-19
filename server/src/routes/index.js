import express from 'express'
import {router as lab1} from './app1.js'


const router = express.Router()

router.use('/api',lab1)


export default router