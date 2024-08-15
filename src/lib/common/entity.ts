import {EntityProperties} from "./types/entityProperties";

export abstract class Entity<T> implements EntityProperties {
    private readonly _gid: string
    private readonly _createdAt: Date
    private readonly _updatedAt: Date
    private readonly _id: number

    protected readonly _props: T;

    get props(): T {
        return this._props;
    }

    protected constructor(
        props: T,
        entityProperties: EntityProperties
    ) {
        this._props = props;
        this._gid = entityProperties.gid;
        this._createdAt = entityProperties.createdAt;
        this._updatedAt = entityProperties.updatedAt;
        this._id = entityProperties.id;
    }

    get gid(): string {
        return this._gid;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get id(): number {
        return this._id;
    }
}