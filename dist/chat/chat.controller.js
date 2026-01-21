"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const swagger_1 = require("@nestjs/swagger");
const AskQuestionDto_1 = require("./dto/AskQuestionDto");
const response_util_1 = require("../utils/response.util");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async askQuestion(query) {
        const res = await this.chatService.getResponse(query.prompt);
        const { prompt, negativePrompt } = await this.chatService.preprocessResponse(res.message.content ?? '');
        return response_util_1.ResponseUtil.success({
            statusCode: 200,
            message: '请求成功',
            data: {
                prompt,
                negativePrompt,
            },
        });
    }
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Get)('askQuestion'),
    (0, swagger_1.ApiOperation)({
        summary: '提示词AI生成接口',
        description: '根据用户输入的画面描述生成相应的内容',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'prompt',
        required: true,
        type: String,
        description: '画面描述提示词',
        example: '一只可爱的黑白色小猫',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '成功' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: '请求参数错误' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AskQuestionDto_1.AskQuestionDto]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "askQuestion", null);
exports.ChatController = ChatController = __decorate([
    (0, swagger_1.ApiTags)('Chat API'),
    (0, common_1.Controller)('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
