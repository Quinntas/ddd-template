import {SignUpController} from "./signUp.controller";
import {signUpCommand} from "../../core/signUp";

export const signUpController = new SignUpController(signUpCommand)