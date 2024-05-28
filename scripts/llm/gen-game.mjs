import { AiBot } from './coze.mjs';

const BOT_ID = '7372403809576009729'; // Claude 3 Opus 模型
// const BOT_ID = '7369473402367361041'; // GPT-4 Turbo 模型
// const BOT_ID = '7373886057160753169'; // GPT-4o 模型
const TOKEN = process.env.COZE_TOKEN_ADM;

// 一个游戏，测试 AI 上下文能力
const prompt_game = `
现在我们玩一个游戏：

当我发送一个数字，你应该将这个数字+1，并将结果发给我。
当我发送 "Next"，你应该继续+1，并将结果发给我。
当再次接收到数字后，游戏重新开始。

严格按照游戏规则回复，不要回复其他内容。

首先我给你一个数字是 1

`;

///// 主流程开始 /////

const bot = new AiBot(BOT_ID, TOKEN);
// 主指令
await bot.chat(prompt_game);
await bot.chat('Next');
await bot.chat('Next');
await bot.chat('Next');
await bot.chat('Next');
