import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    description : {
        type:String,
        required:true
    }
})


ProjectSchema.statics.getProjects = async function(){
    const projects = await this.find()
    return projects
}
ProjectSchema.statics.addProject = async function(name,description){
   
    
    const newProject = await this.create({
      name,
      description
    });

    return newProject;
}

ProjectSchema.statics.getProject = async function(id){
    const project= await this.findById(id)
    return project
}


ProjectSchema.statics.updateProject = async function(id,updateData){
    const updatedProject = await this.findByIdAndUpdate(id,updateData,{
        new:true
    })
    return updatedProject
}
ProjectSchema.statics.deleteProject = async function(id){
   
    const assignment = await mongoose.model("Assignment").findOne({ projectId: id });
    if(assignment){
        throw new Error("Can't delete project it has been assigned")
    }

    const deletedAssignment = await this.findByIdAndDelete(id)

    return deletedAssignment
}

export default mongoose.model('Project', ProjectSchema);