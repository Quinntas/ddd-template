import {BaseError, ErrorEnum} from "../errors/errors";

export class HttpError<T> extends BaseError {
    private statusCode: number
    private body: T

    constructor(message: string, statusCode: number, body?: T) {
        super(message, ErrorEnum.PRESENTATION);
        const flatBody = body ? body : {}
        this.body = {
            ...flatBody as T,
            message
        }
        this.statusCode = statusCode
    }
}

export const badRequest = new HttpError('Bad request', 400)