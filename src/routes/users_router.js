import express from "express"
import * as users_controller from "../controllers/users_controller.js"
const users_router = express.Router()

users_router.get("/:user_id",users_controller.get_users_controller)
users_router.post("/",users_controller.create_users_controller)
users_router.put("/",users_controller.update_users_controller)
users_router.delete("/:user_id",users_controller.delete_users_controller)

export default users_router;