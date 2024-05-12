import { executeReadQuery, executeWriteQuery } from "../database/database.js";

export async function createTeachers(teacher_id, name, user_id) {
    const binds = { teacher_id: teacher_id, name: name, user_id: user_id };
    const sql = `INSERT INTO teachers (name, user_id,teacher_id) VALUES (:name, :user_id,:teacher_id)`;
    return await executeWriteQuery(sql, binds);
}

export async function getTeachers(teacher_id,user_id) {
    const binds = { teacher_id: teacher_id ,user_id:user_id};
    const sql = `SELECT * FROM teachers WHERE teacher_id = :teacher_id and user_id =:user_id`;
    return await executeReadQuery(sql, binds);
}
export async function getAllTeachers(user_id) {
    const binds = { user_id: user_id };
    const sql = `SELECT * FROM teachers where user_id =:user_id`;
    return await executeReadQuery(sql, binds);
}

export async function updateTeachers(old_teacher_id, new_teacher_id, name, user_id) {
    const binds = { old_teacher_id: old_teacher_id, new_teacher_id: new_teacher_id, name: name, user_id: user_id };
    const sql = `UPDATE teachers SET teacher_id = :new_teacher_id ,name = :name, WHERE user_id = :user_id and teacher_id = :old_teacher_id`;
    return await executeWriteQuery(sql, binds);
}

export async function deleteTeachers(teacher_id ,user_id) {
    const binds = { teacher_id: teacher_id ,user_id:user_id};
    const sql = `DELETE FROM teachers WHERE teacher_id = :teacher_id and user_id =:user_id`;
    return await executeWriteQuery(sql, binds);
}
