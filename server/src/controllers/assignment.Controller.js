import Assignment from '../model/assignment.Model.js'
import mongoose from 'mongoose'
const controller ={}


controller.verify = (req, res, next) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid MongoDB ObjectId' });
    }
  
    req.id = id; 
    next();
  };
  
controller.getAssignments= async (req,res)=>{
    try{
        const assignmnets = await Assignment.getAssignments()
        res.status(200).json({
            assignmnets
        })

    }catch(e){
        res.status(500).json({
            Error:"Inernal server Error"
        })
    }
}


controller.addAssignment= async (req,res)=>{
    try{
        const { employeeId,projectId,startDate}= req.body
        if( !employeeId || !projectId || !startDate){
            return res.status(400).json({
                Error: "All field are required"
            })
        }
        const assignment = await Assignment.addAssignment(employeeId, projectId, startDate);
        res.status(201).json(assignment);
    }catch(e){
        if(e.name ==="ValidationError"){
            return res.status(400).json({ error: e.message });
        }
        console.error("error while creating assignment: ",e)
        res.status(500).json({
            Error:"internal server Error"
        })
    }
}
controller.getAssignment=async (req,res)=>{
    try{
        const assignment = await Assignment.getAssignment(req.id)
        if(!assignment){
            return res.status(404).json({
                message:"There is no assignment with that id"
            })
        }
        
        res.status(200).json({
            assignment
        })

    }catch(e){
        res.status(500).json({
            Error:"internal server Error"
        })
    }
}

controller.updateAssignment= async (req,res)=>{
    try{

        const updatedAssignment = await Assignment.updateAssignment(req.id,req.body)
        if (!updatedAssignment) {
            return res.status(404).json({ error: 'Assignment not found' });
          }
        res.status(200).json(updatedAssignment);

    }catch(e){
        if(e.name ==="ValidationError"){
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({
            Error:"internal server Error"
        })
    }
    
}
controller.deleteAssignment=async (req,res)=>{
    try {
      const deleted = await Assignment.deleteAssignment(req.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Assignment not found' });
      }
      res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (err) {
        console.log("error while deleting assignment: "+ err)
      res.status(500).json({ error: 'internal server error' });
    }
  
}
export default controller