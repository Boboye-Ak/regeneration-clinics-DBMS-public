const mongoose=require("mongoose")
const patientSchema=mongoose.Schema({
    id:{type:String, required:true},
    name:{type:String, required:true, lowercase:true},
    age:{type:Number, required:true},
    phone1:{type:String, required:true},
    phone2:{type:String},
    address:{type:String, required:true},
    diagnosis:{type:String, required:true},
    activeUser:{type:String, required:true}
})

const patientModel=mongoose.model("patient", patientSchema)
module.exports=patientModel