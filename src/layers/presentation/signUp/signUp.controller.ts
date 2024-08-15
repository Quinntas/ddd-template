import {Controller, HttpRequest, HttpResponse} from "../../../lib/presentation/controller";
import {SignUpControllerDTO, SignUpControllerResponseDTO} from "./signUp.controllerDTO";
import {SignUpCommand} from "../../core/signUp/signUp.command";
import {badRequest} from "../../../lib/presentation/errors";

export class SignUpController extends Controller<SignUpControllerDTO, SignUpControllerResponseDTO> {
    constructor(
        private readonly signUpCommand: SignUpCommand
    ) {
        super();
    }


    async handle(request: HttpRequest<SignUpControllerDTO>): Promise<HttpResponse<SignUpControllerResponseDTO>> {
        if (!request.body)
            throw badRequest

        if (!request.body.email)
            throw badRequest

        if (!request.body.password)
            throw badRequest

        await this.signUpCommand.handle({
            email: request.body.email,
            password: request.body.password
        })

        return {
            body: {
                message: "SignUp was made"
            },
        }
    }
}