import * as dbconnection from "./dbconnection.js";

export async function executeQuery(sql, binds = {}) {
    let conn;
    let result;
    try {
        conn = await dbconnection.get_connection();
        result = await conn.execute(sql, binds, { autoCommit: true });
        console.log('Query executed successfully.');
        return result;

    } catch (err) {
        console.error('Query execution Failed. error:', err);
        // console.log(typeof(err.code))
        return { error: err.code };
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (err) {
                console.error("Error closing connection:", err);
            }
        }
    }
}

export async function executeWriteQuery(sql, binds) {
    const result = await executeQuery(sql, binds);
    if (!result.hasOwnProperty('error')) {
        result["error_flag"] = false;
        return result;
    }
    result["error_flag"] = true;
    
    return result;
}

export async function executeReadQuery(sql, binds) {
    const result = await executeQuery(sql, binds);
    if (!result.hasOwnProperty('error'))
    {
        return result.rows;
    }
    return;
}