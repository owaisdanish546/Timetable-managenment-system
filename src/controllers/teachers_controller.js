import * as teachersModel from "../models/teachers_model.js";
import { send_error_response, send_formatted_response } from "../utility/response.js";

export async function create_teachers_controller(req, res) {
    const { teacher_id, name, user_id } = req.body;

    const result = await teachersModel.createTeachers(teacher_id, name, user_id);
    let message;
    let errorStatus;
    if (!result.error_flag) {
        message = "Teacher created successfully";
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    }
    else {
        if (result.error === "ORA-00001") {
            message = "Teacher Id is already registered.";
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

export async function get_teachers_controller(req, res) {
    const result = await teachersModel.getTeachers(req.params.id,req.params.user_id);
    if (result) {
        if (result.length === 0)
            send_formatted_response(
                res,
                `No teacher found with id=${req.params.teacher_id}`,
                null,
                404
            );
        else {
            let data = {
                teacher_id: result[0][0],
                teacher_name: result[0][1],
            }
            send_formatted_response(res, `Teacher with id=${req.params.id}`, data, 200);
        }
      } else {
        return send_error_response(res, "Internal server error", 500);
    }
}
export async function get_all_teachers_controller(req, res) {
    const user_id = req.params.user_id;
    const result = await teachersModel.getAllTeachers(user_id);
    if (result) {
        if (result.length === 0)
            send_formatted_response(
                res,
                `No teacher found`,
                null,
                404
            );
        else {
            let data = []
            let i = 0
            result.forEach(record => {
               const [teacher_id,name] = record;
               data[i]= { teacher_id:teacher_id,teacher_name: name};
               i++;
            });
            
            send_formatted_response(res, `Teacher records`, data, 200);
        }
      } else {
        return send_error_response(res, "Internal server error", 500);
    }
}

export async function update_teachers_controller(req, res) {
    const { old_teacher_id,new_teacher_id, name, user_id } = req.body;
    const result = await teachersModel.updateTeachers(old_teacher_id,new_teacher_id, name, user_id);

    let message;
    let errorStatus;
    if (!result.error_flag) {
        message = `Teacher with id=${teacher_id} updated successfully!`;
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    }
    else {
        if (result.error === "ORA-00001") {
            message = "Teacher Id is already registered.";
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

export async function delete_teachers_controller(req, res) {
    const result = await teachersModel.deleteTeachers(req.params.id,req.params.user_id);
    if (result)
        send_formatted_response(res, `Teacher with id=${req.params.id} deleted successfully!`, null, 200);
    else send_error_response(res, "Internal server error", 500);
}
