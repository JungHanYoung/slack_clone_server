import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Teams extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", { length: 255, unique: true})
    name: string;

    @OneToMany(() => Users, user => user.ownTeams)
    @JoinColumn()
    owner: Users;

    @ManyToMany(() => Users, user => user.teams)
    @JoinTable()
    members: Users[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}