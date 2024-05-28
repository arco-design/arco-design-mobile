import { AiBotNonStream } from './coze.mjs';

// const BOT_ID = '7372403809576009729'; // Claude 3 Opus 模型
// const BOT_ID = '7369473402367361041'; // GPT-4 Turbo 模型
const BOT_ID = '7373886057160753169'; // GPT-4o 模型

const TOKEN = process.env.COZE_TOKEN_ADM;

const prompt_article = `
今天又是努力工作的一天，帮我写一篇今天的日记，100 字左右

`;

///// 主流程开始 /////

const bot = new AiBotNonStream(BOT_ID, TOKEN);
// 主指令
const answer = await bot.chat(prompt_article);

console.log(answer);
