import {Provide} from "@midwayjs/decorator";
import {BaseService} from "@cool-midway/core";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {Repository} from "typeorm";
import {DeviceEntity} from "../../entity/v2/device";


@Provide()
export class DeviceService extends BaseService {

    @InjectEntityModel(DeviceEntity)
    deviceEntity: Repository<DeviceEntity>;

    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const {} = query;
        const sql = `
            SELECT a.*, b.channelId as channelIdName, b.channelName
            FROM k_device a
                     LEFT JOIN k_channel b ON b.id = a.channelId
            WHERE 1 = 1
        `;
        return this.sqlRenderPage(sql,query);
    }

}
