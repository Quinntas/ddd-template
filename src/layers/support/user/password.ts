import {ValueObject} from "../../../lib/common/valueObject";

export class Password extends ValueObject<string> {
    constructor(value: string) {
        super(value);
    }

    equals(other: typeof this): boolean {
        return this.value === other.value;
    }
}