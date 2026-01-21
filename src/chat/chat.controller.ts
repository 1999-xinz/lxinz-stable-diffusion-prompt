import { Controller, Get, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AskQuestionDto } from './dto/AskQuestionDto';
import { ResponseUtil } from '../utils/response.util';

@ApiTags('Chat API')
@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get('askQuestion')
	@ApiOperation({
		summary: '提示词AI生成接口',
		description: '根据用户输入的画面描述生成相应的内容',
	})
	@ApiQuery({
		name: 'prompt',
		required: true,
		type: String,
		description: '画面描述提示词',
		example: '一只可爱的黑白色小猫',
	})
	@ApiResponse({ status: 200, description: '成功' })
	@ApiResponse({ status: 400, description: '请求参数错误' })
	async askQuestion(@Query() query: AskQuestionDto): Promise<any> {
		const res = await this.chatService.getResponse(query.prompt);
		// 响应数据预处理
		const { prompt, negativePrompt } =
			await this.chatService.preprocessResponse(res.message.content ?? '');

		return ResponseUtil.success({
			statusCode: 200,
			message: '请求成功',
			data: {
				prompt,
				negativePrompt,
			},
		});
	}
}
