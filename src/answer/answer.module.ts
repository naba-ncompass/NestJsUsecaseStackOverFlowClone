import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Upvote } from './upvote.entity';
import { UpvoteService } from './upvote.service';
import { DownvoteService } from './downvote.service';
import { Downvote } from './downvote.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Answer,Upvote,Downvote])],
  controllers: [AnswerController],
  providers:[AnswerService,UpvoteService,DownvoteService]
})
export class AnswerModule {}
