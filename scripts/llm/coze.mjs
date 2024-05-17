import axios from 'axios';
import _ from 'lodash';
import { writeFileSync, appendFileSync } from 'fs';
import { message } from 'gulp-typescript/release/utils';

///// 环境变量 /////
const CHAT_URL = 'https://bots.byteintl.net/open_api/v2/chat';

// 记录日志
export class ChatLog {
    constructor() {
        // 初始化变量
        this.chatHistory = [];
        this.chatId = `${_.now()}${_.random(100000, 999999)}`;
        this.logFiles = [
            `./scripts/llm/log/realtime.log`,
            `./scripts/llm/log/${new Date().toISOString()}.log`,
        ];

        // 初始化文件
        this.logFiles.forEach(i => {
            writeFileSync(i, `${new Date().toISOString()} Chat Id:\n${this.chatId}\n\n`);
        });
    }

    // 写入日志文件，内部方法
    _append(content) {
        this.logFiles.forEach(i => appendFileSync(i, content));
    }

    // 写入查询日志
    query(query) {
        this._append(`${new Date().toISOString()} Query:\n${query} \n\n`);
        this.chatHistory.push({ role: 'user', content_type: 'text', content: query });
    }

    // 写入响应日志
    response(data) {
        this._append(`${new Date().toISOString()} `);
        data?.messages?.forEach(({ type, content }) => {
            if (type === 'verbose') return;
            this._append(`${_.startCase(type)}:\n${content}\n\n`);
            this.chatHistory.push({ role: 'assistant', content_type: 'text', type, content });
        });
    }
}

export class AiBot {
    constructor(botId, token) {
        this.log = new ChatLog();
        this.botId = botId;
        this.token = token;
    }

    // 非流式对话
    async chat(query, withHistory = true) {
        query = query.trim();

        const headers = { Authorization: `Bearer ${this.token}` };
        const body = {
            conversation_id: this.log.chatId,
            bot_id: this.botId,
            user: 'Aex',
            query,
            chat_history: withHistory ? this.log.chatHistory : [],
            // stream: true,
        };
        this.log.query(query);

        // 开始请求
        const res = await axios.post(CHAT_URL, body, { headers });
        this.log.response(res.data);

        // 拼装结果
        const messages = data?.messages?.map(({ type, content }) => {
            return type === 'answer' ? content : '';
        });
        return messages.join('');
    }
}
