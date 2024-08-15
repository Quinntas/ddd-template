export interface HttpRequest<TBody> {
    body: Partial<TBody>
}

export interface HttpResponse<TBody> {
    body: TBody
    statusCode?: number
    contentType?: 'json'
}

export abstract class Controller<TRequest, TResponse> {
    public abstract handle(request: HttpRequest<TRequest>): Promise<HttpResponse<TResponse>>;
}