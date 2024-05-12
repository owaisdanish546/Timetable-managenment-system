import * as oracledb from "oracledb";
import { config } from "../config/db_config.js";

const config_obj = {
  user: config.user,
  password: config.password,
  connectString: config.host_ip+"/"+config.sid
};


async function get_connection(){
    let connection = await oracledb.getConnection(config_obj);
    return connection;
}

export {get_connection}
