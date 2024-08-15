export enum ErrorEnum {
    UNEXPECTED = 'UNEXPECTED',
    PRESENTATION = 'PRESENTATION'
}

export class BaseError extends Error {
    private readonly _errorEnum: ErrorEnum;

    constructor(message: string, errorEnum: ErrorEnum = ErrorEnum.UNEXPECTED) {
        super(message);
        this.name = 'BaseError';
        this._errorEnum = errorEnum;
    }

    get errorEnum(): ErrorEnum {
        return this._errorEnum;
    }
}