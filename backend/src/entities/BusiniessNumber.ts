import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Store } from './Store';

@Entity('business_numbers')
@Unique(['business_number'])
export class BusinessNumber {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  business_number!: string;

  @Column()
  is_valid!: boolean;

  @OneToMany(() => Store, store => store.businessNumber)
  stores!: Store[];
}
