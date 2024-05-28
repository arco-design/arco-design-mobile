import axios from 'axios';
import _ from 'lodash';
import { writeFileSync, appendFileSync } from 'fs';

///// 一些常量 /////
const CHAT_URL = 'https://bots.byteintl.net/open_api/v2/chat';

// 对话日志，基础类
class ChatLog {
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
}

// 对话日志（非流式）
class ChatLogNonStream extends ChatLog {
    // 处理查询日志
    query(query) {
        this._append(`${new Date().toISOString()} Query:\n${query} \n\n`);
        this.chatHistory.push({ role: 'user', content_type: 'text', content: query });
    }

    // 处理响应日志（非流式），并返回 answer
    response(data) {
        this._append(`${new Date().toISOString()} `);
        let answer = '';
        data?.messages?.forEach(({ type, content }) => {
            if (type === 'verbose') return;
            if (type === 'answer') answer += content;
            this._append(`${_.startCase(type)}:\n${content}\n\n`);
            this.chatHistory.push({ role: 'assistant', content_type: 'text', type, content });
        });
        return answer;
    }
}

// 对话日志（流式）
class ChatLogStream extends ChatLog {
    // 处理查询日志
    query(query) {
        this._append(`${new Date().toISOString()} Query:\n${query} \n\n`);
        this.chatHistory.push({ role: 'user', content_type: 'text', content: query });
    }

    // 开始写入响应日志（分块）
    responseChunkStart() {
        this._chunk = {};
        this._append(`${new Date().toISOString()} Response:\n`);
    }
    // 写入响应日志（分块）
    responseChunk(raw) {
        const regex = /data:(\{.*?\})(?=\s|$)/g;
        const matches = String(raw).match(regex);

        for (const match of matches) {
            const data = JSON.parse(match.replace('data:', ''));

            const event = data?.event,
                type = data?.message?.type,
                content = data?.message?.content;

            // 拼接数据
            if (event === 'message' && content) {
                if (!this._chunk?.[type]) this._chunk[type] = '';
                this._chunk[type] += content;

                // 处理 answer
                if (type === 'answer') {
                    this._append(content);
                }
            }
        }
    }
    // 结束响应（分块）
    responseChunkEnd() {
        this._append(`\n\n`);
        _.forEach(this._chunk, (content, type) => {
            if (type === 'verbose') return;
            if (type !== 'answer') {
                this._append(`${_.startCase(type)}:\n${content}\n\n`);
            }
            this.chatHistory.push({ role: 'assistant', content_type: 'text', type, content });
        });
        return this._chunk['answer'];
    }
}

// AI 机器人
export class AiBotNonStream {
    constructor(botId, token) {
        this.log = new ChatLogNonStream();
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
        const answer = this.log.response(res.data);

        return answer;
    }
}

export class AiBot {
    constructor(botId, token) {
        this.log = new ChatLogStream();
        this.botId = botId;
        this.token = token;
    }

    // 流式对话
    async chat(query, withHistory = true) {
        query = query.trim();

        const headers = { Authorization: `Bearer ${this.token}` };
        const body = {
            conversation_id: this.log.chatId,
            bot_id: this.botId,
            user: 'Aex',
            query,
            chat_history: withHistory ? this.log.chatHistory : [],
            stream: true, // 将请求变为流式
        };
        this.log.query(query);

        // 开始请求 - 注意这里使用流式处理方式
        const res = await axios.post(CHAT_URL, body, { headers, responseType: 'stream' });

        this.log.responseChunkStart();

        // 设置一个数组来收集流式数据片段
        res.data.on('data', chunk => {
            this.log.responseChunk(chunk.toString('utf-8'));
        });

        return new Promise((resolve, reject) => {
            res.data.on('end', () => {
                const data = this.log.responseChunkEnd();
                resolve(data);
            });

            res.data.on('error', err => {
                reject(err);
            });
        });
    }
}
