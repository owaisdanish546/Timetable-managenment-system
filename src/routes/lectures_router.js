import * as lecturesController from "../controllers/lectures_controller.js";
import express from "express";

const lectures_router = express.Router();

lectures_router.get("/All/:user_id", lecturesController.get_all_lectures_controller);
lectures_router.get("/:course_code/:section/:user_id", lecturesController.get_lectures_controller);
lectures_router.post("/", lecturesController.create_lectures_controller);
lectures_router.put("/", lecturesController.update_lectures_controller);
lectures_router.delete("/:course_code/:section/:user_id", lecturesController.delete_lectures_controller);

export default lectures_router;
