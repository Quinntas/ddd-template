import {MySqlTable, MySqlTransaction} from "drizzle-orm/mysql-core";
import {MySql2Database, MySql2PreparedQueryHKT, MySql2QueryResultHKT, MySqlRawQueryResult} from "drizzle-orm/mysql2";
import {Cache} from "../../contracts/cache";
import {EntityProperties} from "../../common/types/entityProperties";
import {ExtractTablesWithRelations, InferInsertModel, InferSelectModel, SQL} from "drizzle-orm";
import {SelectedFields} from 'drizzle-orm/mysql-core/query-builders/select.types';
import {RepoError, RepositoryErrorCode, RepositoryErrorData} from "./repositoryErrors";

export type Transaction = MySqlTransaction<
    MySql2QueryResultHKT,
    MySql2PreparedQueryHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
>;

interface InsertOptions<Tables extends MySqlTable> {
    values: InferInsertModel<Tables>;
    transaction?: Transaction;
}

interface UpdateOptions<EntityType extends EntityProperties> {
    where: SQL;
    values: Partial<EntityType>;
    transaction?: Transaction;
}

interface CachingOptions {
    key: string;
    expires: number;
}

interface SelectOptions {
    where: SQL;
    select?: SelectedFields;
    cachingOptions?: CachingOptions;
}

export abstract class Repository<EntityType extends EntityProperties, Table extends MySqlTable> {
    protected constructor(
        private readonly _table: Table,
        private readonly _databaseConnection: MySql2Database,
        private readonly _cache: Cache,
    ) {
        this._table = _table;
        this._databaseConnection = _databaseConnection;
        this._cache = _cache;
    }

    get table(): Table {
        return this._table;
    }

    get databaseConnection(): MySql2Database {
        return this._databaseConnection;
    }

    get cache(): Cache {
        return this._cache;
    }

    protected async select(opts: SelectOptions): Promise<InferSelectModel<Table>[]> {
        if (opts.cachingOptions) {
            const cachedResult = await this.cache.get(opts.cachingOptions.key)
            if (cachedResult)
                return JSON.parse(cachedResult)
        }

        let query

        if (opts.select)
            query = this.databaseConnection.select(opts.select)
        else
            query = this.databaseConnection.select()

        query = query.from(this.table).where(opts.where)

        let res

        try {
            res = await query.execute()
        } catch (e: unknown) {
            throw new RepoError('Error selecting record', e as RepositoryErrorData)
        }

        if (res.length === 0)
            throw new RepoError('No record found', undefined, RepositoryErrorCode.ER_NO_RECORD)

        if (opts.cachingOptions)
            await this.cache.set(opts.cachingOptions.key, JSON.stringify(res), opts.cachingOptions.expires)

        return res
    }

    protected async insert(opts: InsertOptions<Table>): Promise<MySqlRawQueryResult> {
        try {
            if (opts.transaction)
                return opts.transaction.insert(this.table).values(opts.values)
            return this.databaseConnection.insert(this.table).values(opts.values)
        } catch (e: unknown) {
            throw new RepoError('Error inserting record', e as RepositoryErrorData)
        }
    }

    protected async update(opts: UpdateOptions<EntityType>): Promise<MySqlRawQueryResult> {
        try {
            if (opts.transaction)
                return opts.transaction.update(this.table).set(opts.values).where(opts.where)
            return this.databaseConnection.update(this.table).set(opts.values).where(opts.where)
        } catch (e: unknown) {
            throw new RepoError('Error updating record', e as RepositoryErrorData)
        }
    }
}

