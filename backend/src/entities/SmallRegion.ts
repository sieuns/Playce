import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { BigRegion } from "./BigRegion";
import { Store } from "./Store";

@Entity("small_regions")
export class SmallRegion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => BigRegion, (br) => br.smallRegions, { nullable: false })
  @JoinColumn({
    name: "big_region_id",
    foreignKeyConstraintName: "fk_smallregion_bigregion",
  })
  bigRegion!: BigRegion;

  @OneToMany(() => Store, (store) => store.smallRegion)
  stores!: Store[];
}
