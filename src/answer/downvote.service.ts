import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { Downvote } from './downvote.entity';

@Injectable()
export class DownvoteService {
    constructor(@InjectRepository(Downvote) private repo: Repository<Downvote>) { }

    async downVoteAnswer(answer: Answer, user: User) {
        if (!answer)
            throw new NotFoundException("No answer found!")

        // if(Upvote)
        //     throw ("You have already Upvoted!");

        const downvote = this.repo.create()
        downvote.answer = answer
        downvote.user = user
        return this.repo.save(downvote)
    }


    // New code 
    async isPresent(answerId: number, userId: number) {
        const downvote = await this.repo
            .createQueryBuilder("downvote")
            .where("downvote.answer.id= :answerId", { answerId })
            .andWhere("downvote.user.id== :userId", { userId }).getOne()

        if (downvote) {
            return true;
        }
        return false;
    }

}
