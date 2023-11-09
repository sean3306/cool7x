import {BaseEntity} from "@cool-midway/core";
import {Column, Entity, Index} from "typeorm";


/**
 * 安装来源日志
 */

@Entity("k_install_info_detail")
export class InstallInfoDetailEntity extends BaseEntity{
    @Index({unique:true})
    @Column({comment:'安装来源ID'})
    installId:number;

    @Column({comment:"版本号"})
    version:string;

    @Column({comment:"最近登陆IP"})
    ip:string;

    @Column({comment:'最后来源信息',type:"text"})
    installReferrer:string;

    @Column({comment: '国家'})
    country:string;

    @Column({comment: 'iso编码'})
    country_code:string;

    @Column({comment: '运营商'})
    isp:string;
}
