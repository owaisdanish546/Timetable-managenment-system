import * as venuesModel from "../models/venues_model.js";
import { send_error_response, send_formatted_response } from "../utility/response.js";

export async function create_venues_controller(req, res) {
    const { name, user_id } = req.body;

    const result = await venuesModel.createVenues(name, user_id);
    let message;
    let errorStatus;
    if (!result.error_flag) {
        message = "Venue created successfully";
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    } else {
        if (result.error === "ORA-00001") {
            message = "Venue name is already registered.";
            errorStatus = 409;
        } else if (result.error === "ORA-01400") {
            message = "Cannot insert NULL into column";
            errorStatus = 400;
        } else {
            message = "Internal server error";
            errorStatus = 500;
        }

        return send_error_response(res, message, errorStatus);
    }
}

export async function get_venues_controller(req, res) {
    const result = await venuesModel.getVenues(req.params.name,req.params.user_id);
    if (result) {
        if (result.length === 0)
            send_formatted_response(
                res,
                `No venue found with name=${req.params.name}`,
                null,
                404
            );
        else {
            let data = {
                name: result[0][0],
                user_id: result[0][1]
            };
            send_formatted_response(res, `Venue with name=${req.params.name}`, data, 200);
        }
    } else {
        return send_error_response(res, "Internal server error", 500);
    }
}

export async function get_all_venues_controller(req, res) {
    const user_id = req.params.user_id;
    const result = await venuesModel.getAllVenues(user_id);
    if (result) {
        if (result.length === 0)
            send_formatted_response(
                res,
                `No venues found`,
                null,
                404
            );
        else {
            let data = [];
            let i = 0;
            result.forEach(record => {
                const [name] = record;
                data[i] = { venue_name: name };
                i++;
            });

            send_formatted_response(res, `Venue records`, data, 200);
        }
    } else {
        return send_error_response(res, "Internal server error", 500);
    }
}

export async function update_venues_controller(req, res) {
    const { old_name, new_name, user_id } = req.body;
    const result = await venuesModel.updateVenues(old_name, new_name, user_id);

    let message;
    let errorStatus;
    if (!result.error_flag) {
        message = `Venue with name=${name} updated successfully!`;
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    } else {
        if (result.error === "ORA-00001") {
            message = "Venue name is already registered.";
            errorStatus = 409;
        } else if (result.error === "ORA-01400") {
            message = "Cannot insert NULL into column";
            errorStatus = 400;
        } else {
            message = "Internal server error";
            errorStatus = 500;
        }

        return send_error_response(res, message, errorStatus);
    }
}

export async function delete_venues_controller(req, res) {
    const result = await venuesModel.deleteVenues(req.params.name,req.params.user_id);
    if (result)
        send_formatted_response(res, `Venue with name=${req.params.name} deleted successfully!`, null, 200);
    else send_error_response(res, "Internal server error", 500);
}
