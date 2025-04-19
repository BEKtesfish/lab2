import express from 'express'
import projectCtr from '../controllers/project.Controller.js'
export  const router = express.Router()


router.param("id", projectCtr.verify)
router.route('/')
      .get(projectCtr.getProjects)
      .post(projectCtr.addProject)

router.route('/:id')
      .get(projectCtr.getProject)
      .put(projectCtr.updateProject)
      .delete(projectCtr.deleteProject)