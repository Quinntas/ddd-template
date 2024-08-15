import {SignUpCommand} from "./signUp.command";
import {userRepo} from "../../support/user";

export const signUpCommand = new SignUpCommand(userRepo)