import { executeReadQuery, executeWriteQuery } from "../database/database.js";

export async function createCourses(course_code, course_name, semester, credit_hours, user_id) {
    const binds = { course_code: course_code, course_name: course_name, semester: semester, credit_hours: credit_hours, user_id: user_id };
    const sql = `INSERT INTO courses (course_code, course_name, semester, credit_hours,user_id) VALUES (:course_code, :course_name, :semester, :credit_hours,:user_id)`;
    return await executeWriteQuery(sql, binds);
}

export async function getCourses(course_code, user_id) {
    const binds = { course_code: course_code, user_id: user_id };
    const sql = `SELECT * FROM courses WHERE course_code = :course_code and user_id =: user_id  `;
    return await executeReadQuery(sql, binds);
}
export async function getAllCourses(user_id) {
    const binds = { user_id: user_id };
    const sql = `SELECT * FROM courses where user_id =:user_id`;
    return await executeReadQuery(sql, binds);
}

export async function updateCourses(old_course_code, new_course_code, course_name, semester, credit_hours, user_id) {
    const binds = { old_course_code: old_course_code, new_course_code: new_course_code, course_name: course_name, semester: semester, credit_hours: credit_hours, user_id: user_id };
    const sql = `UPDATE courses SET course_code = :new_course_code, course_name = :course_name, semester = :semester, credit_hours = :credit_hours WHERE course_code = :old_course_code and user_id =: user_id`;
    return await executeWriteQuery(sql, binds);
}
export async function deleteCourses(course_code,user_id) {
    const binds = { course_code: course_code ,user_id:user_id};
    const sql = `DELETE FROM courses WHERE course_code = :course_code and user_id =: user_id`;
    return await executeWriteQuery(sql, binds);
}
