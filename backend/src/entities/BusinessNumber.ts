import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Store } from './Store';

@Entity('business_numbers')
@Unique(['businessNumber'])
export class BusinessNumber {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'business_number' })
  businessNumber!: string;

  @Column({ name: 'is_valid' })
  isValid!: boolean;

  @OneToMany(() => Store, store => store.businessNumber)
  stores!: Store[];
}
