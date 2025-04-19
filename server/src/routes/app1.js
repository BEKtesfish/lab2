import express from 'express'
import {router as assignmentRoute} from './assignment.Route.js'
import {router as employeeRoute} from './employee.Route.js'
import {router as projectRoute} from './project.Route.js'


export const router = express.Router()

router.use('/assignments',assignmentRoute)
router.use('/employees',employeeRoute)
router.use('/projects',projectRoute)

