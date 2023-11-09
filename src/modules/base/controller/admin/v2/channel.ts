import {BaseController, CoolController} from "@cool-midway/core";
import {ChannelEntity} from "../../../entity/v2/channel";
import {ChannelService} from "../../../service/v2/ChannelService";

@CoolController({
    api: ['add', 'delete', 'update', 'info', 'page', 'list'],
    entity: ChannelEntity,
    service:ChannelService
})
export class ChannelController extends BaseController{

}
