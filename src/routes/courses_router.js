import * as courses_controller from "../controllers/courses_controller.js"
import express from "express"

const courses_router = express.Router()

courses_router.get("/All/:user_id",courses_controller.get_all_courses_controller);
courses_router.get("/:course_code/:user_id",courses_controller.get_courses_controller);
courses_router.post("/",courses_controller.create_courses_controller);
courses_router.put("/",courses_controller.update_courses_controller);
courses_router.delete("/:course_code/:user_id",courses_controller.delete_courses_controller)

export default courses_router;
