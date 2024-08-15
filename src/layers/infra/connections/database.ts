import {createPool} from "mysql2";
import {drizzle} from "drizzle-orm/mysql2";

const mysqlPool = createPool({
    uri: process.env.DATABASE_URI,
})

export const rwDatabaseConn = drizzle(mysqlPool);