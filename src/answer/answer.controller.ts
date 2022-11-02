import { Controller,Post,Param,Body,Get,NotFoundException ,UseGuards,Query} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AnswerDto } from './dtos/answer.dto';
import { CurrentUser } from 'src/user/decorators/current-users.decorator';
import { User } from 'src/user/user.entity';
import { currentQuestion } from 'src/question/decorators/current-question.decorator';
import { Question } from 'src/question/question.entity';
import { WriteAnswerDto } from './dtos/write-answer.dto';
import { UpvoteService } from './upvote.service';
import { DownvoteService } from './downvote.service';

@Controller()
@UseGuards(AuthGuard)
export class AnswerController {
    constructor(private answerService:AnswerService,
                private upvoteService:UpvoteService,
                private downvoteService:DownvoteService
                ){}


    @Post('/:id/writeAnswer')
    @Serialize(AnswerDto)
    writeAnswer(@Body() body:WriteAnswerDto,@CurrentUser() user:User,@currentQuestion() question:Question){
        return this.answerService.writeAnswer(body,user,question)
    }

    @Get('/:id/answers')
    getAnswersForQuestion(@Query() query : any, @CurrentUser() user:User,@currentQuestion() question:Question){
        console.log(question);
        return this.answerService.allGetAnswersForQuestion(query.order,user,question)
    }

    @Get('/:queId/upVote/:ansId')
    async upVoteAnswer(@Param('ansId') ansId: string, @CurrentUser() user: User) {
        const answer = await this.answerService.findOneVote(parseInt(ansId))
        if(answer === null)
            throw new NotFoundException( "incorrect DATA for QUESTION ID AND ANSWERID")
        const isDownVoted = await this.downvoteService.isPresent(answer.id, user.id)

        if (isDownVoted) 
            throw new NotFoundException( "can not upvote you have alredy DownVoted")
        
        await this.upvoteService.upVoteAnswer(answer, user)
        return this.answerService.countUpVote(answer)

    }

    @Get('/:queId/downVote/:ansId')
    async downVoteAnswer(@Param('ansId') ansId: string, @CurrentUser() user: User) {
        const answer = await this.answerService.findOneVote(parseInt(ansId))
        if(answer === null)
            throw new NotFoundException("incorrect DATA for QUESTION ID AND ANSWERID")
        const isUpVoted = await this.upvoteService.isPresent(answer.id, user.id)

        if (isUpVoted) 
            throw new NotFoundException( "can not downvote you have already Upvoted")
        
        await this.downvoteService.downVoteAnswer(answer, user)
        return this.answerService.countDownVote(answer)
        
    }

    @Get('/sortBy/:request')
    sortBy(@Param('request') request: string, ){
        if(request === "time")
            return this.answerService.atTimeOfCreatingQuestion()
        if(request === "vote")
            return this.answerService.SortByBestVote()
        throw new NotFoundException('Sorting methord not found')
    }

}

