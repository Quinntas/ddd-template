import {UserRepo} from "./user.repo";
import {userTable} from "./user.model";
import {rwDatabaseConn} from "../../infra/connections/database";
import {cache} from "../../infra/connections/cache";

export const userRepo = new UserRepo(
    userTable,
    rwDatabaseConn,
    cache
)