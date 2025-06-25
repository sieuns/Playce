import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Point,
  Index,
} from "typeorm";
import { User } from "./User";
import { StoreImage } from "./StoreImage";
import { Favorite } from "./Favorite";
import { Broadcast } from "./Broadcast";
import { BusinessNumber } from "./BusiniessNumber";
import { BigRegion } from "./BigRegion";
import { SmallRegion } from "./SmallRegion";

@Entity("stores")
export class Store {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.stores, { nullable: false })
  @JoinColumn({
    name: "user_id",
    foreignKeyConstraintName: "fk_store_user",
  })
  user!: User;

  @Column()
  store_name!: string;

  @ManyToOne(() => BusinessNumber, (bn) => bn.stores, { nullable: false })
  @JoinColumn({
    name: "business_number_id",
    foreignKeyConstraintName: "fk_store_business_number",
  })
  businessNumber!: BusinessNumber;

  @Column()
  address!: string;

  @ManyToOne(() => BigRegion, (br) => br.stores, { nullable: false })
  @JoinColumn({
    name: "big_region_id",
    foreignKeyConstraintName: "fk_store_bigregion",
  })
  bigRegion!: BigRegion;

  @ManyToOne(() => SmallRegion, (sr) => sr.stores, { nullable: false })
  @JoinColumn({
    name: "small_region_id",
    foreignKeyConstraintName: "fk_store_smallregion",
  })
  smallRegion!: SmallRegion;

  @Index({ spatial: true })
  @Column({
    type: "point",
    spatialFeatureType: "Point",
    srid: 4326,
  })
  location!: Point;

  @Column()
  phone!: string;

  @Column()
  opening_hours!: string;

  @Column("text")
  menus!: string;

  @Column()
  type!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => StoreImage, (img) => img.store)
  images!: StoreImage[];

  @OneToMany(() => Favorite, (fav) => fav.store)
  favorites!: Favorite[];

  @OneToMany(() => Broadcast, (bc) => bc.store)
  broadcasts!: Broadcast[];
}
