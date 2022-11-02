import { Controller,Body,Post,Get,Param,UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { CurrentUser } from '../user/decorators/current-users.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { QuestionDto } from './dtos/question.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from 'src/user/user.entity';
import { bookmarksService } from './bookmarks.service';


@Controller('question')
@UseGuards(AuthGuard)
export class QuestionController {
    constructor(private questionService:QuestionService,private bookmarksService:bookmarksService){}

    @Post('/askQuestion')
    @Serialize(QuestionDto)
    createQuestion(@Body() body:CreateQuestionDto,@CurrentUser() user:User){
        return this.questionService.create(body,user);
    }

    @Get()
    getQuestions(){
        return this.questionService.findAll()
    }

    @Post('/:id/bookmarkedQuestions')
    async bookmarkTheQuestion(@Param('id') id: string,@CurrentUser() user:User){
        const question= await this.questionService.findOne(parseInt(id))

        return this.bookmarksService.bookmarkQuestion(question,user)
    }

    @Get('/bookmarkQuestion')
    getBookMarkedQuestions(@CurrentUser() user:User){
        return this.bookmarksService.getBookmarkedQuestion(user)

    }
}
