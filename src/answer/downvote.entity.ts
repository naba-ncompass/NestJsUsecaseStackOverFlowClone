import { User } from "../user/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";


@Entity()
export class Downvote{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=>Answer,(answer:Answer)=>answer.downvote)
    answer:Answer

    @OneToOne(()=>User)
    @JoinColumn()
    user:User

}