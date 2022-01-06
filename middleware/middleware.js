const jwt=require("jsonwebtoken")
const Patient=require("../models/patientmodel")

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt
    if (!token){
        return res.redirect("/login")
    }
    jwt.verify(token, "boboyesecret", (err, decodedToken)=>{
        if(err){
            return res.redirect("/login")
        }
        if (decodedToken){
            next()

        }
    } )

}

const patientDataMiddleware=async (req, res, next)=>{
    const {id}=req.params
    const patient=await Patient.findOne({id:id})
    res.locals.id=patient.id
    next()
}

module.exports={requireAuth, patientDataMiddleware}