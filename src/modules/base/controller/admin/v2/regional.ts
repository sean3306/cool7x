import {BaseController, CoolController} from "@cool-midway/core";
import {RegionalEntity} from "../../../entity/v2/regional";

@CoolController({
    api: ['add', 'delete', 'update', 'page', 'list'],
    entity: RegionalEntity,
})
export class RegionalController extends BaseController{

}
