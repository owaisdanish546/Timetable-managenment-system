import * as venues_controller from "../controllers/venues_controller.js";
import express from "express";

const venues_router = express.Router();

venues_router.get("/All/:user_id", venues_controller.get_all_venues_controller);
venues_router.get("/:name/:user_id", venues_controller.get_venues_controller);
venues_router.post("/", venues_controller.create_venues_controller);
venues_router.put("/", venues_controller.update_venues_controller);
venues_router.delete("/:name/:user_id", venues_controller.delete_venues_controller);

export default venues_router;
