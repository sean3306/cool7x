import {BaseController, CoolController} from "@cool-midway/core";
import {InstallInfoDetailEntity} from "../../../entity/v2/install_info_detail";

@CoolController({
    api: ['add', 'delete', 'update', 'info', 'page', 'list'],
    entity: InstallInfoDetailEntity
})
export class InstallInfoDetailController extends BaseController{

}
