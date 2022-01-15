import {JsonRequest} from "http-req-builder";
import {definitions, operations} from "../../.temp/types";
import {BaseController} from "./base.controller";
import {JsonRequestWithValidation} from "../request";

export class StoreController extends BaseController {
    async getInventory() {
        return (
            await new JsonRequest()
                .url(`http://localhost/v2/store/inventory`)
                .headers({ token: this.params.token })
                .cookieJar(this.params.cookies)
                .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }

    async placeOrder(order: Omit<definitions["Order"], 'id'>) {
        return (await new JsonRequestWithValidation()
            .url('http://localhost/v2/store/order')
            .headers({token: this.params.token})
            .method('POST')
            .body(order)
            .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }

    async getOrderById(id: number | string) {
        return (await new JsonRequestWithValidation()
                .url(`http://localhost/v2/store/order/${id}`)
                .headers({token: this.params.token})
                .send<Required<operations['getOrderById']['responses']['200']['schema']>>()
        )
    }
}