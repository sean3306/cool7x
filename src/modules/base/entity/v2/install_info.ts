import {BaseEntity} from "@cool-midway/core";
import {Column, Entity, Index} from "typeorm";


/**
 * 安装详情
 */

@Entity("k_install_info")
export class InstallInfoEntity extends BaseEntity{
    @Index({unique:true})

    @Column({comment:'渠道ID'})
    channelId:number;

    @Column({comment:"IMEI"})
    imei:string;

    @Column({comment:"最新版本号"})
    lastVersion:string;

    @Column({comment:"最近登陆IP"})
    lastIP:string;

    @Column({comment: '国家'})
    country:string;

    @Column({comment: 'iso编码'})
    country_code:string;

    @Column({comment: '运营商'})
    isp:string;

    @Column({comment: '通过状态,0:未通过，1:已通过'})
    state:number;

    @Column({comment:'最近来源信息',type:"text"})
    lastInstallReferrer:string;

}
