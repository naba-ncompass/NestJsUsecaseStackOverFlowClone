import { Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,ManyToOne, OneToOne, JoinTable, JoinColumn, ManyToMany, OneToMany} from 'typeorm'
import { User } from '../user/user.entity'
import { Question } from './question.entity'


@Entity()
export class Bookmarks{
    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn({type:"datetime"})
    createdtime:Date

    @ManyToOne(()=>User,(user:User)=>user.questions)
    user:User

    @ManyToOne(()=>Question,(question:Question) => question.bookmark)
    question:Question

}