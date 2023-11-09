import {Autoload, Init, Scope, ScopeEnum} from "@midwayjs/core";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {BaseSysParamEntity} from "../entity/sys/param";
import {Repository} from "typeorm";
import {Inject} from "@midwayjs/decorator";
import {CacheManager} from "@midwayjs/cache";


/**
 * 启动时初始化参数管理至redis
 */

@Autoload()
@Scope(ScopeEnum.Singleton)
export class InitParams{

    @InjectEntityModel(BaseSysParamEntity)
    baseSysParamEntity: Repository<BaseSysParamEntity>;

    @Inject()
    cacheManager: CacheManager;

    @Inject()
    appDir;

    @Init()
    async init(){
        const params = await this.baseSysParamEntity.find();
        for (const param of params) {
            await this.cacheManager.set(`param:${param.keyName}`, param);
        }

        let mmdb = await this.cacheManager.get(`tool:mmdbFilePath`);

        if(!mmdb){
            const mmdbPath = `${this.appDir}/public/Country.mmdb`
            this.cacheManager.set(`tool:mmdbFilePath`,mmdbPath);
        }
    }
}
