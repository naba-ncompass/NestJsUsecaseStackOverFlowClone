import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { User } from "src/user/user.entity";
import { Question } from "src/question/question.entity";
import { Upvote } from "./upvote.entity";
import { Downvote } from "./downvote.entity";

@Entity()
export class Answer{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    ans:string

    @Column({default:0})
    upvotes:number

    @Column({default:0})
    downvote:number

    @Column({default:0})
    totalvote:number

    @CreateDateColumn({type:"datetime"})
    createdtime:Date

    @ManyToOne(()=>Question,(question)=>question.answers)
    question:Question

    @ManyToOne(()=>User,(user:User)=>user.questions)
    user:User

    @OneToMany(()=>Upvote,(upvote:Upvote)=>upvote.answer)
    upvote:Upvote[]

    @OneToMany(()=>Downvote,(downvotes:Downvote)=>downvotes.answer)
    downvotes:Downvote[]


}