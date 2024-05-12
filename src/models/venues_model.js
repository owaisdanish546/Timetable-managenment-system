import { executeReadQuery, executeWriteQuery } from "../database/database.js";

export async function createVenues(name, user_id) {
    const binds = { name: name, user_id: user_id };
    const sql = `INSERT INTO venues (name, user_id) VALUES (:name, :user_id)`;
    return await executeWriteQuery(sql, binds);
}

export async function getVenues(name,user_id) {
    const binds = { name: name ,user_id:user_id};
    const sql = `SELECT * FROM venues WHERE name = :name and user_id = :user_id`;
    return await executeReadQuery(sql, binds);
}

export async function getAllVenues(user_id) {
    const binds = { user_id: user_id };
    const sql = `SELECT * FROM venues where user_id=:user_id`;
    return await executeReadQuery(sql, binds);
}

export async function updateVenues(old_name, new_name, user_id) {
    const binds = { old_name: old_name, new_name: new_name, user_id: user_id };
    const sql = `UPDATE venues SET name = :new_name WHERE user_id = :user_id  name = :old_name`;
    return await executeWriteQuery(sql, binds);
}

export async function deleteVenues(name,user_id) {
    const binds = { name: name ,user_id:user_id};
    const sql = `DELETE FROM venues WHERE name = :name and user_id = :user_id `;
    return await executeWriteQuery(sql, binds);
}

export async function countVenues(user_id) {
    const binds = { user_id: user_id };
    const sql = `SELECT COUNT(*) AS venue_count FROM venues WHERE user_id = :user_id`;
    const result = await executeReadQuery(sql, binds);
    if (result && result.length > 0) {
        return result[0][0]; // Assuming the column alias is "VENUE_COUNT"
    }
    return result; // Default value if no rows are returned
}
