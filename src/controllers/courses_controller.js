import * as coursesModel from "../models/courses_model.js";
import { send_error_response, send_formatted_response } from "../utility/response.js";

export async function create_courses_controller(req, res) {
    const { course_code, course_name, semester, credit_hours ,user_id } = req.body;

    const result = await coursesModel.createCourses(course_code, course_name, semester, credit_hours,user_id);
    let message;
    let errorStatus;
    if (!result.error_flag) {
        message = "Course created successfully";
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    }
    else {
        if (result.error === "ORA-00001") {
            message = "Course code is already registered.";
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

export async function get_courses_controller(req, res) {
    const result = await coursesModel.getCourses(req.params.course_code,req.params.user_id);
    if (result) {
        if (result.length === 0)
            send_formatted_response(
                res,
                `No course found with code=${req.params.course_code}`,
                null,
                404
            );
        else {
            let data = {
                course_code: result[0][0],
                course_name: result[0][1],
                semester: result[0][2],
                credit_hours: result[0][3]
            }
            send_formatted_response(res, `Course with code=${req.params.course_code}`, data, 200);
        }
      } else {
        return send_error_response(res, "Internal server error", 500);
    }
}
export async function get_all_courses_controller(req, res) {
    const user_id = req.params.user_id;

    const result = await coursesModel.getAllCourses(user_id);
    if (result) {
        if (result.length === 0)
            send_formatted_response(
                res,
                `No course found`,
                null,
                404
            );
        else {
            let data = []
            let i = 0
            result.forEach(record => {
               const [course_code,course_name,semester,credit_hours] = record;
               data[i]= { course_code:course_code,course_name: course_name,semester:semester,credit_hours:credit_hours};
               i++;
            });
            
            send_formatted_response(res, `course records`, data, 200);
        }
      } else {
        return send_error_response(res, "Internal server error", 500);
    }
}

export async function update_courses_controller(req, res) {
    const { old_course_code, new_course_code, course_name, semester, credit_hours ,user_id} = req.body;
    const result = await coursesModel.updateCourses(old_course_code, new_course_code, course_name, semester, credit_hours,user_id);

    let message;
    let errorStatus;
    if (!result.error_flag) {
        message = `Course with code=${course_code} updated successfully!`;
        errorStatus = 200;

        return send_formatted_response(res, message, null, errorStatus);
    }
    else {
        if (result.error === "ORA-00001") {
            message = "Course code is already registered.";
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

export async function delete_courses_controller(req, res) {
    const result = await coursesModel.deleteCourses(req.params.course_code,req.params.user_id);
    if (result)
        send_formatted_response(res, `Course with code=${req.params.course_code} deleted successfully!`, null, 200);
    else send_error_response(res, "Internal server error", 500);
}
