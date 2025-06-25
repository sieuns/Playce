// src/entities/Broadcast.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Store } from "./Store";

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

  @Column()
  sport!: string;

  @Column()
  league!: string;

  @Column({ nullable: true })
  team_one!: string;

  @Column({ nullable: true })
  team_two!: string;

  @Column("text", { nullable: true })
  etc!: string;

  @CreateDateColumn({ type: "timestamp"})
  created_at!: Date;
}
