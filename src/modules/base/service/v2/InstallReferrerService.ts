import {Provide} from "@midwayjs/decorator";
import {BaseService} from "@cool-midway/core";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {InstallInfoEntity} from "../../entity/v2/install_info";
import {Repository} from "typeorm";


@Provide()
export class InstallReferrerService extends BaseService {

    @InjectEntityModel(InstallInfoEntity)
    installInfoEntity: Repository<InstallInfoEntity>;

    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const {} = query;
        const sql = `
            SELECT 
                a.*, 
                b.channelName
            FROM k_install_info a
            LEFT JOIN k_channel b ON a.channelId = b.id
            WHERE 1 = 1
        `;
        return this.sqlRenderPage(sql,query);
    }

}
