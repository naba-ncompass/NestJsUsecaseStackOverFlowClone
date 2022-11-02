import { Question } from 'src/question/question.entity';
import { Answer } from 'src/answer/answer.entity';
import {
    AfterInsert,
    AfterRemove,
    AfterUpdate,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column()
    password: string;

    @OneToMany(() => Question, (question) => question.user)
    questions:Question[]

    @OneToMany(()=>Answer,(answer)=>answer.user)
    answers:Answer[]
  
    @AfterInsert()
    logInsert() {
      console.log('Inserted User with id', this.id);
    }
  
    @AfterUpdate()
    logUpdate() {
      console.log('Updated User with id', this.id);
    }
  
    @AfterRemove()
    logRemove() {
      console.log('Removed User with id', this.id);
    }
  }
  