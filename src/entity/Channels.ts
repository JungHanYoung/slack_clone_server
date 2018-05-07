import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Messages } from "./Messages";
import { Users } from "./Users";

@Entity()
export class Channels extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", { length: 50 })
    name: string;

    @Column("boolean")
    public: boolean;

    @OneToMany(() => Messages, message => message.channel)
    @JoinColumn()
    messages: Messages[];

    @ManyToMany(() => Users, user => user.channels)
    @JoinTable()
    members: Users[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}