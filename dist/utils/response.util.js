"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
const common_1 = require("@nestjs/common");
class ResponseUtil {
    static success(data, message = '请求成功') {
        return {
            statusCode: common_1.HttpStatus.OK,
            message,
            data,
        };
    }
    static error(message, statusCode = common_1.HttpStatus.BAD_REQUEST) {
        throw new common_1.HttpException({
            statusCode,
            message,
        }, statusCode);
    }
}
exports.ResponseUtil = ResponseUtil;
