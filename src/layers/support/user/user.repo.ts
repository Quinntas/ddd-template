import {Repository} from "../../../lib/infra/repository/repository";
import {userTable} from "./user.model";
import {User} from "./user";
import {MySql2Database} from "drizzle-orm/mysql2";
import {Cache} from "../../../lib/contracts/cache";

export class UserRepo extends Repository<User, typeof userTable> {
    constructor(
        table: typeof userTable,
        databaseConnection: MySql2Database,
        cache: Cache
    ) {
        super(table, databaseConnection, cache);
    }

    async save(user: User) {
        return this.insert({
            values: {
                email: user.props.email,
                password: user.props.password.value
            }
        })
    }
}