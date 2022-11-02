import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { Question } from 'src/question/question.entity';
import { WriteAnswerDto } from './dtos/write-answer.dto';

@Injectable()
export class AnswerService {
    constructor(@InjectRepository(Answer) private repo:Repository<Answer>){}

    async writeAnswer(body:WriteAnswerDto,user:User,question:Question){
        const answer = this.repo.create(body)
        answer.user=user;
        answer.question=question;

        return this.repo.save(answer)
    }

    async findOne(id:number){
        return this.repo.findOne({
            where:{id}
            }
        );
    }
   
    async writeOneAnswer(body:WriteAnswerDto,user:User,question:Question){
        const answer = this.repo.create(body)
        answer.user=user;
        answer.question=question;

        return this.repo.save(answer)
    }

    async findOneVote(id:number){
        return this.repo.findOne({
            where:{id}
            }
        );
    }

    async upVoteAnswer(ansId:number){
        const answer =await this.findOneVote(ansId)
        Object.assign(answer,{"upvotes":answer.upvotes+1})

        return this.repo.save(answer)
    }

    async countUpVote(answer:Answer){
        Object.assign(answer,{"upvotes":answer.upvotes+1})
        return this.repo.save(answer)
    }

    async downVoteAnswer(ansId:number){
        const answer =await this.findOneVote(ansId)
        Object.assign(answer,{"downvote":answer.downvote+1})
        return this.repo.save(answer)
    }

    async countDownVote(answer:Answer){
        Object.assign(answer,{"downvote":answer.downvote+1})
        return this.repo.save(answer)
    }

    //testing 
        async getAnswersForQuestion(){
            const question = await this.repo
                .createQueryBuilder('answer')
                .leftJoinAndSelect('answer.question','question')
                .select('question.que')
                .getRawMany()

           const solutions = await this.repo
                .createQueryBuilder('answer')
                .leftJoinAndSelect('answer.question','question')
                .leftJoinAndSelect('answer.user','user')
                .select(['answer.ans','answer.createdtime','answer.upvotes','user.email'])
                .getRawMany()
            const questionandanswer = {question, solutions}

            return questionandanswer
    }

    async allGetAnswersForQuestion(order:string,user:Partial<User>,question:Partial<Question>){
    
        // this.repo.answer.totalvote = answer.upVotes- answer.downvote
        const solution = await  this.repo
        .createQueryBuilder('answer')
        .where('questionId = :queId',{queId:question.id})
        .leftJoinAndSelect('answer.question','question')
        .leftJoinAndSelect('answer.user','user')
        .select(['question.que','question.createdtime','answer.ans','answer.createdtime','answer.upvotes','user.email'])
        .getRawMany()

        // const isBookmark = await this.repo
        // .createQueryBuilder('bookmarks')
        // .where('questionId = :queId',{queId:question.id})
        // .andWhere('userId = :ueId',{ueId:user.id})
        // .select('user')
        // .getRawOne()


        let questionandanswer = {}
        questionandanswer['question'] = question.que
        questionandanswer['answer'] = solution
        //questionandanswer['is_bookMark_question_user'] = isBookmark

        return questionandanswer

    }


    async atTimeOfCreatingQuestion(){
        return this.repo
        .createQueryBuilder('question')
        .orderBy('question.createdtime','DESC')
        // .select(['question.id','question.que','question.ans'])
        .getRawMany()
    }

    async SortByBestVote() {
        return this.repo
        .createQueryBuilder('answer')
        .orderBy('answer.upvotes','DESC')
        .getRawMany()
    }

}
