import { getUsersByEmailPassword } from "../models/users_model.js"
import { send_error_response, send_formatted_response } from "../utility/response.js"

export async function validate_login_controller(req, res) {
    const { email, password } = req.body;
    // console.log(req.body)
    // console.log( email +" " + password);

    let result = await getUsersByEmailPassword(email, password);
    if (result) {
        if (result.length === 0) {
            send_formatted_response(res, `Invalid Email Or Password!`, null, 401);
        } else {
            let data = {
                user_id: result[0][0],
                first_name: result[0][1],
                surname: result[0][4],
                email: result[0][2],
                password: result[0][3],
            }
            send_formatted_response(res, `Login successfull`, data, 200);
        }

    }
    else {
        return send_error_response(res, "Internal server error", 500);
    }
}