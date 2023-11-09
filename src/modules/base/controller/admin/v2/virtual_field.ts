import {BaseController, CoolController} from "@cool-midway/core";
import {VirtualFieldEntity} from "../../../entity/v2/virtual_field";

@CoolController({
    api: ['add', 'delete', 'update', 'page', 'list'],
    entity: VirtualFieldEntity,
})
export class VirtualFieldController extends BaseController{

}
