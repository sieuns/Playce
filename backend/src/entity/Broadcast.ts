import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
  } from 'typeorm';
// 나중에 Store 엔티티 생기면 import도 추가해야 함
  
  @Entity()
  export class Broadcast {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    store_id!: number;
  
    @Column({ type: 'date' })
    match_date!: string;
  
    @Column({ type: 'time' })
    match_time!: string;
  
    @Column()
    sport!: string;
  
    @Column()
    league!: string;
  
    @Column({ nullable: true })
    team_one!: string;
  
    @Column({ nullable: true })
    team_two!: string;
  
    @Column({ type: 'text', nullable: true })
    etc!: string;
  
    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
  
    // 나중에 Store 엔티티 생기면 이거 주석 풀면 됨
    // @ManyToOne(() => Store, store => store.broadcasts)
    // @JoinColumn({ name: 'store_id' })
    // store: Store;
  }
  