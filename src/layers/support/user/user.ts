import {AggregateRoot} from "../../../lib/common/aggregateRoot";
import {Password} from "./password";
import {EntityProperties} from "../../../lib/common/types/entityProperties";

interface UserProps {
    email: string
    password: Password
}

export class User extends AggregateRoot<UserProps> {
    constructor(
        props: UserProps,
        entityProps: EntityProperties
    ) {
        super(props, entityProps);
    }

    static create(props: UserProps): User {
        return new User(props, {} as any);
    }

    changePassword(password: Password): void {
        this.props.password = password;
    }
}