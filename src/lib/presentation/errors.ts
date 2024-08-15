import {BaseError, ErrorEnum} from "../errors/errors";

export class HttpError<T> extends BaseError {
    private readonly _statusCode: number
    private readonly _body: T

    get statusCode() {
        return this._statusCode
    }

    get body() {
        return this._body
    }

    constructor(message: string, _statusCode: number, _body?: T) {
        super(message, ErrorEnum.PRESENTATION);
        const flat_body = _body ? _body : {}
        this._body = {
            ...flat_body as T,
            message
        }
        this._statusCode = _statusCode
    }
}

export const badRequest = new HttpError('Bad request', 400)

export const internalServerError = new HttpError('Internal server error', 500)