const jwt=require("jsonwebtoken")

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

module.exports={requireAuth}