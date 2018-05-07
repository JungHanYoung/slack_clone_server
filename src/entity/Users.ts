import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import { IsEmail } from "class-validator";
import { Teams } from "./Teams";
import { Messages } from "./Messages";
import { Channels } from "./Channels";
import * as bcrypt from "bcryptjs";

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar", { length: 255, unique: true })
    @IsEmail()
    email: string;

    @Column("text")
    password: string;

    @Column("boolean", { default: false })
    confirmed: boolean;

    @ManyToMany(() => Teams, team => team.members)
    teams: Teams[];

    @OneToMany(() => Teams, team => team.owner)
    ownTeams: Teams[];

    @OneToMany(() => Messages, message => message.user)
    messages: Messages[];

    @ManyToMany(() => Channels, channel => channel.members)
    channels: Channels[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

}