import {Provide} from "@midwayjs/decorator";
import {BaseService} from "@cool-midway/core";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {ChannelEntity} from "../../entity/v2/channel";
import {Repository} from "typeorm";
import {ChannelIpRoleEntity} from "../../entity/v2/ip_role";


@Provide()
export class OpenChannelService extends BaseService {
    @InjectEntityModel(ChannelEntity)
    channelEntity: Repository<ChannelEntity>;

    @InjectEntityModel(ChannelIpRoleEntity)
    channelIpRoleEntity: Repository<ChannelIpRoleEntity>;


    async getChannelByDomainName(hostName:string){
        return await this.channelEntity.findOneBy({bindDomain: hostName});
    }
}
