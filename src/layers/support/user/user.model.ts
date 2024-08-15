import {datetime, int, mysqlTable, varchar} from "drizzle-orm/mysql-core";
import {sql} from "drizzle-orm";
import {v4} from "uuid";

// @formatter:off
export const baseColumns = {
    id: int('id').autoincrement().primaryKey(),
    pid: varchar('pid', {length: 191})
        .notNull()
        .$defaultFn(() => v4()),
    createdAt: datetime('createdAt')
        .notNull()
        .default(sql`now()`),
    updatedAt: datetime('updatedAt')
        .notNull()
        .default(sql`now() on update now()`),
};


export const userTable = mysqlTable('users',{
    ...baseColumns,
    email: varchar('email', {length: 191}).notNull().unique(),
    password: varchar('password', {length: 191}).notNull(),
})

