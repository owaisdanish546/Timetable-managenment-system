import { validate_login_controller } from "../controllers/validate_login_controller.js"
import express from "express"
const validate_login_router = express.Router();

validate_login_router.post("/",validate_login_controller);

export default validate_login_router;