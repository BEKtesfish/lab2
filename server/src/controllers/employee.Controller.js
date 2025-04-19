import Employee from '../model/employee.Model.js'
import mongoose from 'mongoose'

const controller = {}

controller.verify = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid MongoDB ObjectId' });
    }
    req.id = id;
    next();
}

// GET all employees
controller.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.getEmployees()
        res.status(200).json({ employees })
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// GET one employee
controller.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.getEmployee(req.id)
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" })
        }
        res.status(200).json({ employee })
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// ADD employee
controller.addEmployee = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        if (!fullName || !email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const employee = await Employee.addEmployee(fullName, email, password)
        res.status(201).json(employee)

    } catch (err) {
        console.error("Error adding employee:", err)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// UPDATE employee
controller.updateEmployee = async (req, res) => {
    try {
        const updated = await Employee.updateEmployee(req.id, req.body)

        if (!updated) {
            return res.status(404).json({ error: "Employee not found" })
        }

        res.status(200).json(updated)

    } catch (err) {
      
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// DELETE employee
controller.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.deleteEmployee(req.id)

        if (!deleted) {
            return res.status(404).json({ error: "Employee not found" })
        }

        res.status(200).json({ message: "Employee deleted successfully" })

    } catch (err) {
        if (err.message.includes("active assignment")) {
            return res.status(400).json({ error: err.message })
        }
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export default controller
