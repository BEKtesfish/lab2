import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const EmployeeSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        match:[/.+\@.+\..+/,"Please fill a valid email address"]
    },
    hashedPassword:{
        type:String,
        required:true,
    }
},
    {
        timestamps:true
    }
)  

EmployeeSchema.statics.getEmployees = async function(){
    const employees = await this.find()
    return employees
}
EmployeeSchema.statics.addEmployee = async function(fullName,email,password){
    const salt = await bcrypt.genSalt(10);  
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newEmployee = await this.create({
      fullName,
      email,
      hashedPassword,
    });

   
    newEmployee.hashedPassword = null;

    return newEmployee;
}

EmployeeSchema.statics.getEmployee = async function(id){
    const employee = await this.findById(id)
    return employee
}


EmployeeSchema.statics.updateEmployee = async function(id,updateData){
    const updatedEmployee = await this.findByIdAndUpdate(id,updateData,{
        new:true
    })
    return updatedEmployee
}
EmployeeSchema.statics.deleteEmployee = async function(id){
   
    const assignment = await mongoose.model("Assignment").findOne({ employeeId: id });
    if(assignment){
        throw new Error("Cant delete employee he has an active assignment")
    }

    const deletedAssignment = await this.findByIdAndDelete(id,{
        new:true
    })

    return deletedAssignment
}

export default mongoose.model('Employee', EmployeeSchema);