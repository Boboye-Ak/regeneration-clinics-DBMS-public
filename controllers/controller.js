const masterkey="masterkey"
const {isEmail}=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/usermodel")
const Patient=require("../models/patientmodel")

const createToken=(id)=>{
    const token=jwt.sign({id}, "boboyesecret", {expiresIn:3*24*60*60})
    return token
}

module.exports.login_get=(req, res)=>{
    res.render("login");
};   

module.exports.signup_get=(req, res)=>{
    res.render("signup");
};

module.exports.homepage_get=(req, res)=>{
    res.render("homepage");
};
module.exports.addpatient_get=(req, res)=>{
    res.render("addpatient")
}


module.exports.signup_post=async (req, res)=>{
    const {email, password, masterpassword}=req.body
    const isemail=isEmail(email)
    const emailCheck=await User.findOne({email:email})
    if (emailCheck){
        let error={email:"Email already registered"}
        return res.json({error})
    }
    if (!isemail){
        let error={email:"Please enter valid email"}
        return res.json({error})
    }
    if (masterpassword!==masterkey){
        let error={masterpassword:"enter correct masterpassword"}
        return res.json({error})
    }

    const salt= await bcrypt.genSalt()
    const hashedPassword=await bcrypt.hash(password, salt)
    let id=Date.now().toString()
    let newUser=await User.create({id:id, email:email, password:hashedPassword})
    const newUser_id=newUser._id
    const token=createToken(newUser_id)
    res.cookie("jwt", token, {maxAge:3*24*60*60*1000})
    res.json({success:"new user created successfully"})
   
}

module.exports.login_post=async (req, res)=>{
    const {email, password}=req.body
    const user=await User.findOne({email:email})
    if (!user){
        return res.json({emailerror:"Please enter a registered email"})
    }
    
    const auth=bcrypt.compare(password, user.password)
    if (!auth){
        return res.json({passworderror:"Please enter correct password"})
    }

    const token=createtoken(user._id)
    res.cookie("jwt", token)
    res.json({success:"login successful"})


}

module.exports.checkUser_post=async (req, res)=>{
    const {token}=req.body
        jwt.verify(token, "boboyesecret", async (err, decodedToken)=>{
        if(err){
            return res.redirect("/login")
        }
        if (decodedToken){
            const user=await User.findById(decodedToken.id)
            res.json({user:user})


        }
    } )

}

module.exports.addpatient_post=async(req, res)=>{
   const {name, age, phone1, phone2, address, diagnosis, activeUser}=req.body
   const id=Date.now().toString()
    let newPatient=await Patient.create({id:id, name:name, age:age, phone1:phone1, phone2:phone2, address:address, diagnosis:diagnosis,activeUser:activeUser })
    res.json({success:"Patient created successfully", patient:newPatient})

}

module.exports.getPatientdata=async (req, res)=>{
    const {id}=req.params
    const patient=await Patient.findOne({id:id})
    res.render("Patientdata", {id:patient.id})
}

module.exports.delete_post=async(req, res)=>{
    const {id}=req.body
    await Patient.deleteOne({id:id})
    res.json({success:"Patient successfully deleted"})

}

module.exports.getPatient=async(req, res)=>{
    const {id}=req.body
    const patient=await Patient.findOne({id:id})
    res.json({patient:patient})
}

module.exports.editPatient=async(req, res)=>{
    const {id, name, age, phone1, phone2, address, diagnosis}=req.body
    const response=await Patient.updateOne({id:id}, {$set:{name:name, age:age, phone1:phone1, phone2:phone2, address:address, diagnosis:diagnosis}})
    const newPatient=await Patient.findOne({id:id})
    res.json({patient:newPatient})

}

module.exports.get_data=async(req, res)=>{
    res.render("data")

}

module.exports.fetchData=async(req, res)=>{
    const reversepatients=await Patient.find({})
    const patients=reversepatients.reverse()
    res.json(patients)
}