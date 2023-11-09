import {Column, Entity} from "typeorm";
import {BaseEntity} from "@cool-midway/core";


@Entity("k_device")
export class DeviceEntity extends BaseEntity{

    @Column({comment:'玩家ID'})
    playerId:string;

    @Column({comment: '渠道ID'})
    channelId:string;

    @Column({comment: '版本号'})
    version:string;

    @Column({comment: "系统语言"})
    language:string;

    @Column({comment:"手机型号"})
    deviceModel:string;

}
