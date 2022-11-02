import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { Bookmarks } from './bookmarks.entity';
import { User } from '../user/user.entity';

@Injectable()
export class bookmarksService {
    constructor(@InjectRepository(Bookmarks) private repo:Repository<Bookmarks>){}

    async findOne(id:number){
        return this.repo.findOne({
            where:{id}
            }
        );
    }

    findAll(){
        return this.repo
        .createQueryBuilder()
        .getRawMany()
    }

    async bookmarkQuestion(question:Question,user:User){
        if(!question) 
            throw new NotFoundException('question not exists!');
            const questionInBookmark = await this.findOne(question.id);
            if(questionInBookmark ){
                return "You have already bookmarked"
            }
            const bookmark= this.repo.create()
            bookmark.question=question
            bookmark.user=user
            const bookmarkthings = this.repo.save(bookmark)
            return (await bookmarkthings).id,(await bookmarkthings).createdtime,(await bookmarkthings).question
    
    }
    
    async getBookmarkedQuestion({id}:User){
        console.log(id)
        return this.repo
        .createQueryBuilder('bookmarks')
        .leftJoinAndSelect('bookmarks.question','question')
        .leftJoinAndSelect('bookmarks.user','user')
        .select(['question.que','user.email'])
        .where('bookmarks.userId =:id', {id})
        .getRawMany()

    }
}
