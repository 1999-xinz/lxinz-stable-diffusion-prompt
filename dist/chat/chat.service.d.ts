interface IPreprocessedResponse {
    prompt: string;
    negativePrompt: string;
}
export declare class ChatService {
    private client;
    constructor();
    getResponse(prompt: string): Promise<any>;
    preprocessResponse(content: string): Promise<IPreprocessedResponse>;
}
export {};
