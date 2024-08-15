import {Command} from "../../../lib/common/command";
import {UserRepo} from "../../support/user/user.repo";
import {User} from "../../support/user/user";
import {SignUpCommandDTO, SignUpCommandResponseDTO} from "./signUp.commandDTO";
import {Password} from "../../support/user/password";

export class SignUpCommand extends Command<SignUpCommandDTO, SignUpCommandResponseDTO> {
    constructor(
        private readonly userRepo: UserRepo
    ) {
        super();
        this.userRepo = userRepo;
    }

    async handle(dto: SignUpCommandDTO) {
        const password = new Password(dto.password);

        const user = User.create({
            email: dto.email,
            password,
        })

        await this.userRepo.save(user);
    }
}