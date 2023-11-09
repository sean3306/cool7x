import {BaseController, CoolController} from "@cool-midway/core";
import {DeviceEntity} from "../../../entity/v2/device";
import {DeviceService} from "../../../service/v2/DeviceService";


@CoolController({
    api: ['add', 'delete', 'update', 'info', 'page', 'list'],
    entity: DeviceEntity,
    service:DeviceService
})
export class DeviceController extends BaseController{

}
