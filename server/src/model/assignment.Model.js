import mongoose from 'mongoose'

const AssignmentSchema = new mongoose.Schema(
    {
        employeeId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Employee",
            required : true,
            validate : {
                validator:async function(value){
                    const exists = await mongoose.model("Employee").exists({_id : value });
                    return exists
                },
                message:"Invalid employeeId: not found in dataBase"
            }
        },
        projectId:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Project",
            required : true,
            validate : {
                validator:async function(value){
                    const exists = await mongoose.model("Project").exists({_id : value });
                    return exists
                },
                message:"Invalid projectId: not found in dataBase"
            }
        },
        startDate:{
            type:Date,
            required:true
        }
    },{
        timestamps:true
    }
)

AssignmentSchema.statics.getAssignments= async function(){
        const assignments = await this.find()
                                      .populate("employeeId")
                                      .populate("projectId");
        return assignments
}


AssignmentSchema.statics.getAssignment = async function(id){
    const assignment = await this.findOne({_id:id})
                                 .populate("employeeId")
                                 .populate("projectId");
    return assignment
}
AssignmentSchema.statics.addAssignment = async function(employeeId, projectId, startDate){
    const getAssignment = await this.findOne({ projectId });
    if(getAssignment){
        throw new Error("The project is already assigned")
    }
    const newAssignment = await this.create({
        employeeId,
        projectId,
        startDate
    })
    await newAssignment.populate([
        { path: 'employeeId' },
        { path: 'projectId' }
      ]);

  return newAssignment;
}
AssignmentSchema.statics.updateAssignment = async function(id){
    const updateAssignment= this.findByIdAndUpdate(id,updateData,{
        new:true,
        runValidation:true
    })
    .populate("employeeId")
    .populate("projectId")
    return updateAssignment
}

AssignmentSchema.statics.deleteAssignment=async function (id){
    const deletedAssignment = await  this.findByIdAndDelete(id,{
        new:true,
        runValidation:true
});
    return deletedAssignment
}

export default mongoose.model('Assignment',AssignmentSchema)