import {httpProvider} from "../connections/httpProvider";
import {v1Router} from "./routers/v1.router";

httpProvider.useRouter(v1Router)

httpProvider.listen()

