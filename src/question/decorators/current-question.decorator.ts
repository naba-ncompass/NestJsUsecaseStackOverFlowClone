import { createParamDecorator,ExecutionContext  } from "@nestjs/common";

export const currentQuestion = createParamDecorator(
    (data: never, context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest();
        console.log(request)
        return request.currentQuestion;
    }
)