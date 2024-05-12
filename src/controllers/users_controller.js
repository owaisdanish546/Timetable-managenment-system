import * as usersModel from "../models/users_model.js"
import { send_error_response, send_formatted_response } from "../utility/response.js";

export async function create_users_controller(req, res) {
    const { first_name, surname, email, password } = req.body;

    const result = await usersModel.createUsers(first_name, surname, email, password);
    let message;
    let errorStatus;

    if (!result.error_flag) {//.hasOwnProperty('error')) {
        message = "User created successfully";
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    }
    else {
        if (result.error === "ORA-00001") {
            message = "Email is already registered.";
            errorStatus = 409;
        }
        else if (result.error === "ORA-01400") {
            message = "Cannot insert NULL into column"
            errorStatus = 400;
        }
        else {
            message = "Internal server error";
            errorStatus = 500;
        }

        return send_error_response(res, message, errorStatus);
    }
}

export async function get_users_controller(req, res) {
    const result = await usersModel.getUsers(req.params.user_id);
    if (result) {
        if (result.length === 0)
            send_formatted_response(res, `No user found with id=${req.params.id}`, null, 404);
        else {
            let data = {
                user_id: result[0][0],
                first_name: result[0][1],
                surname: result[0][4],
                email: result[0][2],
                password: result[0][3],
            }
            send_formatted_response(res, `user with id=${req.params.id}`, data, 200);
        }
    }
    else {
        return send_error_response(res, "Internal server error", 500);
    }
}

export async function update_users_controller(req, res) {
    const { user_id, first_name, surname, email, password } = req.body;
    const result = await usersModel.updateUsers(user_id, first_name, surname, email, password);
    let message;
    let errorStatus;

    if (!result.error_flag) {
        message = `user with id=${user_id} updated successfully!`;
        errorStatus = 200;
        return send_formatted_response(res, message, null, 200)
    }
    // res.send(`user with id=${user_id} updated successfully!`);
    else {
        if (result.error === "ORA-00001") {
            message = "Email is already registered.";
            errorStatus = 409;
        }
        else if (result.error === "ORA-01400") {
            message = "Cannot insert NULL into column"
            errorStatus = 400;
        }
        else {
            message = "Internal server error";
            errorStatus = 500;
        }

        return send_error_response(res, message, errorStatus);
    }
    // return send_error_response(res, `Could not update users with id=${user_id}`, null, 500)
    // res.send(`Could not update users with id=${user_id}`);
}

export async function delete_users_controller(req, res) {
    const result = await usersModel.deleteUsers(req.params.user_id);
    if (result)
        send_formatted_response(res, `user with id=${req.params.id} deleted successfully!`, null, 200);
    else send_error_response(res, "Internal server error", 500);
}
