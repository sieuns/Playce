import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Store } from "./Store";
import { Sport } from "./Sport";
import { League } from "./League";

@Entity("broadcasts")
export class Broadcast {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Store, (store) => store.broadcasts, { nullable: false })
  @JoinColumn({
    name: "store_id",
    foreignKeyConstraintName: "fk_broadcast_store",
  })
  store!: Store;

  @Column({ type: "date" })
  match_date!: string;

  @Column({ type: "time" })
  match_time!: string;

  @ManyToOne(() => Sport, (sport) => sport.broadcasts, { nullable: false })
  @JoinColumn({
    name: "sport_id",
    foreignKeyConstraintName: "fk_broadcast_sport",
  })
  sport!: Sport;

  @ManyToOne(() => League, (league) => league.broadcasts, { nullable: false })
  @JoinColumn({
    name: "league_id",
    foreignKeyConstraintName: "fk_broadcast_league",
  })
  league!: League;

  @Column({ nullable: true })
  team_one!: string;

  @Column({ nullable: true })
  team_two!: string;

  @Column("text", { nullable: true })
  etc!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
