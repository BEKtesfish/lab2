import express from 'express'
import employeeCtr from '../controllers/employee.Controller.js'

export  const router = express.Router()
router.param("id", employeeCtr.verify)
router.route('/')
      .get(employeeCtr.getEmployees)
      .post(employeeCtr.addEmployee)

router.route('/:id')
      .get(employeeCtr.getEmployee)
      .put(employeeCtr.updateEmployee)
      .delete(employeeCtr.deleteEmployee)