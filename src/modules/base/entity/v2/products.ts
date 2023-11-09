import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '@cool-midway/core';


@Entity('k_product')
export class ProductEntity extends BaseEntity {
    @Index({ unique: true })
    @Column({ comment: '产品ID' ,nullable: true})
    productId: number;

    @Column({comment: '产品名称', nullable: true})
    productName:string;

    @Column({comment:'产品密钥', nullable: true})
    productPassword:string;

    @Column({comment:'产品B口下载地址', nullable: true})
    productPlanBUrl:string;
}
