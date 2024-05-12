import * as teachers_controller from "../controllers/teachers_controller.js"
import express from "express"

const teachers_router = express.Router()

teachers_router.get("/All/:user_id",teachers_controller.get_all_teachers_controller);
teachers_router.get("/:id/:user_id",teachers_controller.get_teachers_controller);
teachers_router.post("/",teachers_controller.create_teachers_controller);
teachers_router.put("/",teachers_controller.update_teachers_controller);
teachers_router.delete("/:id/:user_id",teachers_controller.delete_teachers_controller)

export default teachers_router;
