import { executeReadQuery, executeWriteQuery } from "../database/database.js";

export async function createLectures(teacher_id, course_code, section, user_id) {
    const binds = { teacher_id: teacher_id, course_code: course_code, section: section, user_id: user_id };
    const sql = `INSERT INTO lectures (teacher_id, course_code, section, user_id) VALUES (:teacher_id, :course_code, :section, :user_id)`;
    return await executeWriteQuery(sql, binds);
}

export async function getLectures(course_code, section, user_id) {
    const binds = { course_code: course_code, section: section, user_id: user_id };
    const sql = `SELECT * FROM lectures WHERE course_code =: course_code and section =: section and user_id =: user_id`;
    return await executeReadQuery(sql, binds);
}

export async function getAllLectures(user_id) {
    const binds = { user_id: user_id };
    const sql = `SELECT * FROM lectures WHERE user_id = :user_id`;
    return await executeReadQuery(sql, binds);
}

export async function updateLectures(old_course_code, old_section, teacher_id, new_course_code, new_section, user_id) {
    const binds = { teacher_id: teacher_id, old_course_code: old_course_code, new_course_code: new_course_code, old_section: old_section, new_section: new_section, user_id: user_id };
    const sql = `UPDATE lectures SET teacher_id = :teacher_id, course_code = :new_course_code, section = :new_section, user_id = :user_id WHERE course_code = :old_course_code AND user_id = :user_id AND section = :old_section`;
    return await executeWriteQuery(sql, binds);
}

export async function deleteLectures(course_code, section, user_id) {
    const binds = { course_code: course_code, section: section, user_id: user_id };
    const sql = `DELETE FROM lectures WHERE course_code =: course_code and section =: section and user_id =: user_id`;
    return await executeWriteQuery(sql, binds);
}
export async function countLectures(user_id) {
    const binds = { user_id: user_id };
    const sql = `SELECT COUNT(*) AS lecture_count FROM lectures WHERE user_id = :user_id`;
    const result = await executeReadQuery(sql, binds);
    if (result && result.length > 0) {

        return result[0][0]; // Assuming the column alias is "LECTURE_COUNT"
    }
    return result; // Default value if no rows are returned
}
