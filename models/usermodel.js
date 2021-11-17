const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    id:{type:String, required:true},
    email:{type:String, required:true, lowercase:true, unique:true},
    password:{type:String, required:true}
})

const userModel=mongoose.model("user", userSchema)

module.exports=userModel