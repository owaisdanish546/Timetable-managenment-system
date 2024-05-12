import { executeReadQuery, executeWriteQuery } from "../database/database.js"

export async function createUsers(first_name, surname, email, password) {
    const binds = { first_name: first_name, surname: surname, email: email, password: password };
    const sql = `insert into users (first_name,surname,email,password) values(:first_name,:surname,:email,:password)`
    return await executeWriteQuery(sql, binds);
}
export async function getUsersById(user_id) {
    const binds = { user_id: user_id };
    const sql = "select *from users where  user_id=:user_id";
    return await executeReadQuery(sql, binds)
}
export async function getUsersByEmailPassword(email,password){
    const binds = {email:email,password:password};
    const sql = `SELECT *FROM users WHERE email =: email  AND password = :password`;
    return await executeReadQuery(sql, binds)
}
export async function updateUsers(user_id, first_name, surname, email, password) {
    const binds = { user_id: user_id, first_name: first_name, surname: surname, email: email, password: password };
    const sql = `update users values(first_name=:first_name,surname=:surname,email=:email,password=:password) where user_id := user_id `
    return await executeWriteQuery(sql, binds)
}
export async function deleteUsers(user_id) {
    const binds = { user_id: user_id }
    const sql = `delete from users where user_id := user_id`
    return await executeWriteQuery(sql,binds)
}