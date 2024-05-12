import * as lecturesModel from "../models/lectures_model.js";
import { send_error_response, send_formatted_response } from "../utility/response.js";

export async function create_lectures_controller(req, res) {
    const { teacher_id, course_code, section, user_id } = req.body;

    const result = await lecturesModel.createLectures(teacher_id, course_code, section, user_id);
    let message;
    let errorStatus;
    if (!result.error_flag) {
        message = "Lecture created successfully";
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    }
    else {
        if (result.error === "ORA-00001") {
            message = "Lecture is already registered! Try different course or section.";
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

export async function get_lectures_controller(req, res) {
    const { course_code, section, user_id } = req.params;

    const result = await lecturesModel.getLectures(course_code, section, user_id);
    
    if (result) {
        if (result.length === 0) {
            send_formatted_response(
                res,
                `No lecture found with course_code=${course_code}, section=${section}, and user_id=${user_id}`,
                null,
                404
            );
        } else {
            // Assuming the result is an array of lecture objects
            send_formatted_response(res, `Lectures found with course_code=${course_code}, section=${section}, and user_id=${user_id}`, result, 200);
        }
    } else {
        return send_error_response(res, "Internal server error", 500);
    }
}

export async function get_all_lectures_controller(req, res) {
    const user_id = req.params.user_id;
    const result = await lecturesModel.getAllLectures(user_id);
    if (result) {
        if (result.length === 0)
            send_formatted_response(
                res,
                `No lecture found`,
                null,
                404
            );
        else {
            let data = []
            let i = 0
            result.forEach(record => {
                const [,teacher_id, course_code, section] = record;
                data[i] = { teacher_id: teacher_id, course_code: course_code, section: section };
                i++;
            });

            send_formatted_response(res, `Lecture records`, data, 200);
        }
    } else {
        return send_error_response(res, "Internal server error", 500);
    }
}

export async function update_lectures_controller(req, res) {
    const { old_course_code, old_section, teacher_id, new_course_code, new_section, user_id } = req.body;
    const result = await lecturesModel.updateLectures(old_course_code, old_section, teacher_id, new_course_code, new_section, user_id);

    let message;
    let errorStatus;
    if (!result.error_flag) {
        message = `Lecture with teacher_id=${teacher_id} updated successfully!`;
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    }
    else {
        if (result.error === "ORA-00001") {
            message = "Lecture is already registered Try different course of section.";
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

export async function delete_lectures_controller(req, res) {
    const result = await lecturesModel.deleteLectures(req.params.course_code, req.params.section, req.params.user_id);
    if (result)
        send_formatted_response(res, `Lecture with course_code=${req.params.course_code} and section=${req.params.section} deleted successfully!`, null, 200);
    else send_error_response(res, "Internal server error", 500);
}
