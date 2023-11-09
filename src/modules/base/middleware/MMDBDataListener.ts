import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { DataListener } from '@midwayjs/core';
import {Reader} from "@maxmind/geoip2-node";
import * as fs from "fs";
import {Inject} from "@midwayjs/decorator";
import {CacheManager} from "@midwayjs/cache";

@Provide()
@Scope(ScopeEnum.Singleton)
export class MMDBDataListener extends DataListener<Reader> {

    @Inject()
    cacheManager: CacheManager;

    @Inject()
    appDir;

    // 初始化数据
    async initData() {
        const mmdbFile:any = await this.cacheManager.get(`tool:mmdbFilePath`);
        if(mmdbFile){
            const dbBuffer = fs.readFileSync(mmdbFile);
            const reader = Reader.openBuffer(dbBuffer);
            return reader;
        }
    }

    // 更新数据
    async onData() {
        const mmdbFile:any = await this.cacheManager.get(`tool:mmdbFilePath`);
        if(mmdbFile){
            const dbBuffer = fs.readFileSync(mmdbFile);
            const reader = Reader.openBuffer(dbBuffer);
            this.setData(reader);
        }
    }
}
