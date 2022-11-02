import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { Downvote } from './downvote.entity';
import { Answer } from './answer.entity';
import { Upvote } from './upvote.entity';

@Injectable()
export class UpvoteService {
    constructor(@InjectRepository(Upvote) private repo: Repository<Upvote>) { }

    async upVoteAnswer(answer: Answer, user: User) {
        if (!answer)
            throw new NotFoundException("No answer found!")

        const upvote = this.repo.create()
        upvote.answer = answer
        upvote.user = user
        return this.repo.save(upvote)
    }

    // New code 
    async isPresent(answerId: number, userId: number) {
        const upvote = await this.repo
            .createQueryBuilder("upvote")
            .where("upvote.answer.id= :answerId", { answerId })
            .andWhere("upvote.user.id== :userId", { userId }).getOne()

        if (upvote) {
            return true;
        }
        return false;
    }

}
