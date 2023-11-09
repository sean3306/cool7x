import {BaseController, CoolController} from "@cool-midway/core";
import {ProductEntity} from "../../../entity/v2/products";

@CoolController({
    api: ['add', 'delete', 'update', 'info', 'page', 'list'],
    entity: ProductEntity,
})
export class ProductController extends BaseController{

}
