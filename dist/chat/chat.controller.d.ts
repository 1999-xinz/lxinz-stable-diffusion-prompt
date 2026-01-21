import { ChatService } from './chat.service';
import { AskQuestionDto } from './dto/AskQuestionDto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    askQuestion(query: AskQuestionDto): Promise<any>;
}
