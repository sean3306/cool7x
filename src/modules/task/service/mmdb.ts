import {BaseService} from "@cool-midway/core";
import {Inject, Logger, Provide} from "@midwayjs/decorator";
import {ILogger} from "@midwayjs/logger";
import {CacheManager} from "@midwayjs/cache";
import {CoolFile} from "@cool-midway/file";
import {MMDBDataListener} from "../../base/middleware/MMDBDataListener";

@Provide()
export class TaskMmdbService extends BaseService {

    @Logger()
    logger: ILogger;

    @Inject()
    cacheManager: CacheManager;

    @Inject()
    appDir;

    @Inject()
    file: CoolFile;

    @Inject()
    mmdbUtils:MMDBDataListener;

    /**
     * 更新地区文件
     */
    async updateFile() {
        const downloadUrl:any = await this.cacheManager.get(`param:mmdbUrl`);
        const savePath = this.appDir;
        const downloadTask = await this.file.downAndUpload(downloadUrl.data);
        let filePath = downloadTask.substring(downloadTask.indexOf("/public"),downloadTask.length);
        const mmdbPath = savePath+filePath;
        this.cacheManager.set(`tool:mmdbFilePath`,mmdbPath);
        this.mmdbUtils.onData();
        return '文件下载完成';
    }
}
