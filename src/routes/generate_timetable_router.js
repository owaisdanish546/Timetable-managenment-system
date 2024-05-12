import express from "express"
import {generate_timetable_controller} from "../controllers/generate_timetable_controller.js"
import { generate_timetable_middleware } from "../middleware/generate_timetable_middleware.js";
import { generate_timetable_if_possible_middleware } from "../middleware/generate_timetable_if_possible_middleware.js";

const generate_timetable_router = express.Router();

generate_timetable_router.get('/:user_id',generate_timetable_if_possible_middleware,generate_timetable_middleware,generate_timetable_controller);

export default generate_timetable_router;