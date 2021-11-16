const express=require("express");
const { login_get, homepage_get, signup_get, signup_post, login_post, checkUser_post, addpatient_get, addpatient_post, patientdata_get, getPatientdata, delete_post, getPatient, editPatient, get_data, fetchData } = require("../controllers/controller");
const { requireAuth } = require("../middleware/middleware");

const router=express.Router();


router.get("/",requireAuth,homepage_get );
router.get("/login",login_get );
router.get("/signup", signup_get);
router.get("/addpatient",requireAuth, addpatient_get);
router.get("/data", requireAuth,get_data)
router.get("/fetchdata", requireAuth,fetchData)
router.get("/:id",requireAuth, getPatientdata)
router.post("/signup",signup_post);
router.post("/login", login_post);
router.post("/checkuser", checkUser_post );
router.post("/addpatient", addpatient_post);
router.post("/delete", delete_post)
router.post("/getpatient", getPatient)
router.post("/edit", editPatient)

module.exports=router