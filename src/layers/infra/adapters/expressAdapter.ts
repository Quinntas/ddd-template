import {HttpProvider, Method} from "../../../lib/contracts/httpProvider";
import express, {Express, Request, Response, Router} from "express"
import * as http from "node:http";
import {Controller, HttpResponse} from "../../../lib/presentation/controller";
import {Logger} from "../../../lib/contracts/logger";
import compression from "compression";
import cors from "cors"
import helmet from 'helmet';
import bodyParser from "body-parser";
import {logger} from "../connections/logger";
import {HttpError, internalServerError} from "../../../lib/presentation/errors";

export const corsOptions = {
    origin: '*',
    credentials: true,
};

export const compressionOptions = {
    threshold: '1kb',
    filter: (req: Request, res: Response) => {
        if (res.getHeader('x-no-compression')) return false;
        if (res.statusCode === 304) return false;
        const type = res.getHeader('Content-Type') as string[];
        if (type && type.indexOf('text/event-stream') > -1) return false;
        return compression.filter(req, res);
    },
};

export class ExpressAdapter extends HttpProvider<Router> {
    private server: http.Server | undefined
    private readonly app: Express
    private readonly port: number
    private readonly logger: Logger

    constructor(port: number, logger: Logger) {
        super();
        this.app = express()
        this.port = port
        this.logger = logger
        this.initBaseMiddleware()
    }

    createRouter(): Router {
        return Router()
    }

    private initBaseMiddleware() {
        this.app.use(compression(compressionOptions))
        this.app.use(cors(corsOptions))
        this.app.use(helmet())
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
    }

    listen(): void {
        this.server = this.app.listen(this.port, async () => {
            this.logger.info(`[SERVER] Running on port ${this.port}`)
        })
    }

    private async baseHandler(req: Request, res: Response, controller: Controller<any, any>) {
        let result: HttpResponse<any> | undefined

        try {
            result = await controller.handle({body: req.body})
        } catch (err: unknown) {
            logger.error(err as Error)
            if (err instanceof HttpError)
                return this.handleError(err, res)
            return this.handleError(internalServerError, res)
        }

        if (!result)
            return this.handleError(internalServerError, res)

        switch (result.contentType) {
            case 'json':
                this.jsonResponse(result.statusCode ?? 200, result.body, res)
        }
    }

    private handleError(error: HttpError<any>, res: Response) {
        this.jsonResponse(error.statusCode, error.body, res)
    }

    private jsonResponse<T>(status: number, body: T, res: Response) {
        res.setHeader('Content-Type', 'application/json');
        res.status(status)
        res.json(body)
    }

    route(router: Router, method: Method, path: string, controller: Controller<any, any>): void {
        router[method](path, [], (req: Request, res: Response) => this.baseHandler(req, res, controller))
    }

    close(): void {
        if (!this.server)
            throw new Error('Server has not been started')
        this.server.close()
    }

    useRouter(router: Router): void {
        this.app.use(router)
    }
}