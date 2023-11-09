

import { Column, Index, Entity } from 'typeorm';
import { BaseEntity } from '@cool-midway/core';


@Entity('k_regional')
export class RegionalEntity extends BaseEntity {
    @Index({ unique: true })
    @Column({ comment: '国家简写' ,nullable: true})
    isoCode: string;

    @Column({comment: '国家名称', nullable: true})
    countryName:string;
}

