import {Body, Get, Inject, Post, Provide, Query} from "@midwayjs/decorator";
import {BaseController, CoolController, CoolTag, CoolUrlTag, TagTypes} from "@cool-midway/core";
import {CacheManager} from "@midwayjs/cache";
import {Utils} from "../../../../../comm/utils";
import {MMDBDataListener} from "../../../middleware/MMDBDataListener";
import {Reader} from "@maxmind/geoip2-node";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {Repository} from "typeorm";
import {ChannelEntity} from "../../../entity/v2/channel";
import {OpenChannelService} from "../../../service/open/openChannelService";


@CoolUrlTag()
@CoolController("/app/base/conf")
export class BasicController extends BaseController {
    @Inject()
    appDir;

    @Inject()
    cacheManager: CacheManager;
    @Inject()
    ctx;

    @Inject()
    utils: Utils;

    @Inject()
    mmdbUtils:MMDBDataListener;

    @Inject()
    openChannelService:OpenChannelService;

    /**
     * 获取基本配置
     * @param req
     * @param body
     */
    @CoolTag(TagTypes.IGNORE_TOKEN)
    @Post("/get_conf")
    async getConf(
        @Query() params,
        @Body() body
    )
    {
        const ctxs = this.ctx;
        // 获取域名
        const hostName = body["rpcHostName"];
        // 获取请求IP
        // const ip = await this.utils.getReqIP(ctx);
        //
        // //获取渠道信息
        const channelData = await this.openChannelService.getChannelByDomainName(hostName);

        const value = await this.utils.aesDecrypt(channelData.aesKey,params["key"]);

        if(channelData){

            //ip开启验证
            if(channelData.ipVerify){

            }
        }else {

        }


        // const reader:Reader = this.mmdbUtils.getData();
        // let result;
        // if(reader){
        //     //@ts-ignore
        //     result = reader.country(ip);
        // }
        // return result;
        // return await this.utils.getIpAddr(this.ctx,ip);
        // const ip = "2408:8469:c100:10aa:cad:75c6:4d4f:16fd";
        // // const ip = await this.utils.getReqIP(this.ctx);
        // // return this.utils.getNordVPNByIP(ip);
        // // let cache = await this.cacheManager.get(`param:baidu.com`);
        //
        // const dbBuffer = fs.readFileSync(path.join(`${this.appDir}/Country2.mmdb`));
        // const reader = Reader.openBuffer(dbBuffer);
        // let ipDetail;
        // if(typeof(ip) == 'string'){
        //     ipDetail = reader.country(ip);
        // }else{
        //     ipDetail = reader.country(ip[0]);
        // }
        // // const ipDetail = this.MMDBUtils.MMDBReader.country(ip)
        // // this.MMDBUtils.updateMMDB;
        // return ipDetail;
        // return cache;
        // return ip;
    }
}
