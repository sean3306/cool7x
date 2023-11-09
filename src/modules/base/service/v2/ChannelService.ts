import {Provide} from "@midwayjs/decorator";
import {BaseService} from "@cool-midway/core";
import {InjectEntityModel} from "@midwayjs/typeorm";
import {ChannelEntity} from "../../entity/v2/channel";
import {Repository} from "typeorm";
import {ChannelIpRoleEntity} from "../../entity/v2/ip_role";
import * as _ from 'lodash';

@Provide()
export class ChannelService extends BaseService {
    @InjectEntityModel(ChannelEntity)
    channelEntity: Repository<ChannelEntity>;

    @InjectEntityModel(ChannelIpRoleEntity)
    channelIpRoleEntity: Repository<ChannelIpRoleEntity>;

    /**
     * 分页查询
     * @param query
     */
    async page(query) {
        const { channelId,channelName,productId } = query;
        const sql = `
            SELECT a.*,
                   d.productName,
                   GROUP_CONCAT(c.countryName) AS regionalName
            FROM k_channel a
                     LEFT JOIN k_channel_ip_role b ON a.id = b.channelId
                     LEFT JOIN k_regional c ON b.regionalId = c.id
                     LEFT JOIN k_product d ON a.productId = d.id
            WHERE 1 = 1
                ${this.setSql(channelId,`and a.channelId = ?`, [channelId])}
                ${this.setSql(channelName,`and a.channelName LIKE ?`, `%${channelName}%`)}
                ${this.setSql(productId,`and a.productId = ?`, [productId])}
            GROUP BY a.id
        `;
        return this.sqlRenderPage(sql, query);
    }

    /**
     * 根据ID获取信息
     * @param id
     */
    public async info(id) {
        const info = await this.channelEntity.findOneBy({id});
        const ipRoles = await this.nativeQuery(
            `SELECT a.regionalId
             from k_channel_ip_role a
             WHERE a.channelId = ?`,
            [id]
        );
        if (info) {
            if (ipRoles) {
                info.ipRoleIdList = ipRoles.map(e => {
                    return parseInt(e.regionalId)
                })
            }
        }
        return info;
    }

    /**
     * 更新IP授权信息
     * @param param
     */
    async updateIpRole(param) {
        if (_.isEmpty(param.ipRoleIdList)) {
            return;
        }
        //删除之前的数据
        await this.channelIpRoleEntity.delete({channelId: param.id});
        if (param.ipRoleIdList) {
            for (const roleId of param.ipRoleIdList) {
                await this.channelIpRoleEntity.save({regionalId: roleId, channelId: param.id});
            }
        }
    }

    /**
     * 新增
     * @param param
     */
    async add(param) {
        await this.channelEntity.save(param);
        await this.updateIpRole(param);
        return param.id;
    }

    /**
     * 修改
     * @param param
     */
    async update(param) {
        await this.channelEntity.save(param);
        await this.updateIpRole(param);

    }
}
