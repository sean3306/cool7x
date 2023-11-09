import {BaseController, CoolController} from "@cool-midway/core";
import {InstallInfoEntity} from "../../../entity/v2/install_info";
import {InstallReferrerService} from "../../../service/v2/InstallReferrerService";

@CoolController({
    api: ['add', 'delete', 'update', 'info', 'page', 'list'],
    entity: InstallInfoEntity,
    service: InstallReferrerService
})
export class InstallInfoController extends BaseController{

}
