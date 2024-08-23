import express from "express";
import { searchUser, signIn, signUp } from "../controller/usercontroller.js";
import { Verifytoken } from "../Middleware/auth.js";
import { AccessProfile, profileImage } from "../controller/profileController.js";
const app = express();
const route = express.Router();

// route.post("/signIn",Verifytoken,signIn);
// route.post("/signUp",signUp)
route.post("/signUp",signUp);
route.post("/signIn",signIn);
route.post("/FindUser",searchUser)
route.post("/updateProfile",profileImage)
route.post("/accessProfile",AccessProfile)

export default route;


