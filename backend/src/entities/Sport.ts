import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { League } from './League';
import { Broadcast } from './Broadcast';

@Entity('sports')
export class Sport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  is_team_competition!: boolean;

  @OneToMany(() => League, league => league.sport)
  leagues!: League[];

  @OneToMany(() => Broadcast, bc => bc.sport)
  broadcasts!: Broadcast[];
}
