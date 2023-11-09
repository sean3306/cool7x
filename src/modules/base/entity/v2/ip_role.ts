import {Column, Entity} from "typeorm";
import {BaseEntity} from "@cool-midway/core";

@Entity("k_channel_ip_role")
export class ChannelIpRoleEntity extends BaseEntity{
    @Column({comment: "渠道ID",type: "bigint"})
    channelId: number;

    @Column({comment: '地区ID',type: "bigint"})
    regionalId: number;
}
