export abstract class ValueObject<T> {
    private readonly _value: T;

    protected constructor(value: T) {
        this._value = value;
    }

    get value(): T {
        return this._value;
    }

    abstract equals<ValueObjectImpl extends typeof this>(other: ValueObjectImpl): boolean;
}
