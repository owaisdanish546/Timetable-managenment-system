import {countVenues} from "../models/venues_model.js"
import { countLectures } from "../models/lectures_model.js"
import { send_error_response } from "../utility/response.js";


export async function generate_timetable_if_possible_middleware(req, res, next) {
    const user_id = req.params.user_id;
    let lecturesCount = await countLectures(user_id);
    if (lecturesCount != undefined) // if query falis it returns undefined
    {
        if (lecturesCount) {

            let venuesCount = await countVenues(user_id);
            if (venuesCount != undefined) {

                if (venuesCount) {

                    let totalSlotsAvailable = 5 * venuesCount * 8;
                    let requiredSlots = lecturesCount * 3;

                    if (requiredSlots <= totalSlotsAvailable) {
                        return next();
                    }
                    return send_error_response(res, "Slots are limited. Either add more venues or remove some lectures.", 422);

                }
                return send_error_response(res, "No venue found.",422);


            }
            return send_error_response(res, "Internal server Error.", 500)


        }
        return send_error_response(res, "No lecture found.", 422);

    }

    return send_error_response(res, "Internal server Error.", 500)
}