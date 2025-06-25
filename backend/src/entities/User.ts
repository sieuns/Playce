import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Store } from './Store';
import { Favorite } from './Favorite';

@Entity('users')
@Unique(['email'])
@Unique(['phone'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column()
  nickname!: string;

  @Column()
  phone!: string;

  @OneToMany(() => Store, store => store.user)
  stores!: Store[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites!: Favorite[];
}
