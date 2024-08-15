import {BaseError} from "../../errors/errors";

export interface RepositoryErrorData {
    code: string;
    sqlMessage: string;
    sqlState: string;
    sql: string;
}

export enum RepositoryErrorCode {
    ER_DUP_ENTRY = 'ER_DUP_ENTRY',
    ER_UNKNOWN = 'ER_UNKNOWN',
    ER_NO_RECORD = 'ER_NO_RECORD',
}

export class RepoError extends BaseError {
    private readonly _data?: RepositoryErrorData;
    private readonly _code: RepositoryErrorCode;

    constructor(
        message: string,
        _data?: RepositoryErrorData,
        _code: RepositoryErrorCode = RepositoryErrorCode.ER_UNKNOWN,
    ) {
        super(message);
        this._code = _data ? (_data.code as RepositoryErrorCode) : _code;
        this._data = _data;
        this.name = 'RepositoryError';
    }

    get data(): RepositoryErrorData | undefined {
        return this._data;
    }

    get errorCode(): RepositoryErrorCode {
        return this._code;
    }
}