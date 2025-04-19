import Project from '../model/project.Model.js'
import mongoose from 'mongoose'

const controller = {}

// Middleware to verify valid ObjectId
controller.verify = (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid MongoDB ObjectId' })
  }
  req.id = id
  next()
}

// GET all projects
controller.getProjects = async (req, res) => {
  try {
    const projects = await Project.getProjects()
    res.status(200).json({ projects })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// GET single project by ID
controller.getProject = async (req, res) => {
  try {
    const project = await Project.getProject(req.id)
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.status(200).json({ project })
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// ADD a new project
controller.addProject = async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name || !description) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const newProject = await Project.addProject(name, description)
    res.status(201).json(newProject)
  } catch (err) {
   
    console.error('Error adding project:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// UPDATE a project
controller.updateProject = async (req, res) => {
  try {
    const updated = await Project.updateProject(req.id, req.body)

    if (!updated) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.status(200).json(updated)
  } catch (err) {
  
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// DELETE a project
controller.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.deleteProject(req.id)

    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (err) {
    if (err.message.includes('assigned')) {
      return res.status(400).json({ error: err.message })
    }
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default controller
