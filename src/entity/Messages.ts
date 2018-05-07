import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";
import { Channels } from "./Channels";

@Entity()
export class Messages extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    text: string;

    @ManyToOne(() => Channels, channel => channel.messages)
    @JoinColumn()
    channel: Channels;

    @ManyToOne(() => Users, user => user.messages)
    @JoinColumn()
    user: Users;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}