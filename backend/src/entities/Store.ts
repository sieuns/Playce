import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { StoreImage } from "./StoreImage";
import { Favorite } from "./Favorite";
import { Broadcast } from "./Broadcast";

@Entity("stores")
@Unique(["business_number"])
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

  @Column()
  business_number!: string;

  @Column()
  address!: string;

  @Column()
  big_region!: string;

  @Column()
  small_region!: string;

  @Column("float")
  lat!: number;

  @Column("float")
  lng!: number;

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
