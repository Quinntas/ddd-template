import {Controller} from "../presentation/controller";

export type Method =
    | 'get'
    | 'post'
    | 'put'
    | 'delete'
    | 'patch'
    | 'options'
    | 'head';


export abstract class HttpProvider<RouterType> {
    abstract listen(): void

    abstract close(): void

    abstract createRouter(): RouterType

    abstract useRouter(router: RouterType): void

    abstract route(router: RouterType, method: Method, path: string, controller: Controller<any, any>): void

    get(router: RouterType, path: string, controller: Controller<any, any>) {
        this.route(router, 'get', path, controller)
    }

    post(router: RouterType, path: string, controller: Controller<any, any>) {
        this.route(router, 'post', path, controller)
    }
}