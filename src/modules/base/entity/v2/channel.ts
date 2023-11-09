import {Column, Entity, Index} from "typeorm";
import {BaseEntity} from "@cool-midway/core";


@Entity("k_channel")
export class ChannelEntity extends BaseEntity{
    @Index({unique:true})

    @Column({comment:'渠道ID'})
    channelId:number;

    @Column({comment: "渠道名称"})
    channelName:string;

    @Column({comment: '绑定域名'})
    bindDomain:string;

    @Column({comment: '产品类型'})
    productId:number;

    @Column({comment: '是否开启IP验证,0:不开启,1:开启',default:0,type:'tinyint'})
    ipVerify:number;

    //IP地区认证校验ID
    ipRoleIdList:number[];

    @Column({comment: '是否开启来源认证,0:不开启,1:开启',default:0,type:'tinyint'})
    installReferrerVerify:number;

    @Column({comment: '允许安装来源',default:"facebook,"})
    installReferrerArr:string;

    @Column({comment: '混淆字段'})
    confuseJson:string;

    @Column({comment:'B包配置json'})
    planBJson:string;

    @Column({comment:'aes加密密码'})
    aesKey:string;

    @Column({comment: "安装信息获取方式,0:body,1:params,2:header auth"})
    installGetType:number;
}
