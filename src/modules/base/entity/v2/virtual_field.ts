

import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '@cool-midway/core';


@Entity('k_virtual_field')
export class VirtualFieldEntity extends BaseEntity {
    @Index({ unique: true })
    @Column({ comment: '虚拟字段' ,nullable: true})
    field: string;
}

