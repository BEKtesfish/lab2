import express from 'express'
import assignmentCtr from '../controllers/assignment.Controller.js'
export  const router = express.Router()

router.param("id", assignmentCtr.verify)
router.route('/')
      .get(assignmentCtr.getAssignments)
      .post(assignmentCtr.addAssignment)

router.route('/:id')
      .get(assignmentCtr.getAssignment)
      .put(assignmentCtr.updateAssignment)
      .delete(assignmentCtr.deleteAssignment)