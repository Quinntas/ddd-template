import {Entity} from "./entity";
import {AggregateRootProperties} from "./types/aggregateRootProperties";
import {EntityProperties} from "./types/entityProperties";

export abstract class AggregateRoot<T> extends Entity<T> implements AggregateRootProperties {
    protected constructor(
        props: T,
        entityProps: EntityProperties
    ) {
        super(props, entityProps);
    }
}
