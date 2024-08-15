import {httpProvider} from "../../connections/httpProvider";
import {signUpController} from "../../../presentation/signUp";

export const v1Router = httpProvider.createRouter()

httpProvider.post(v1Router, '/signup', signUpController)