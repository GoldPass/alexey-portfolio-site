const express = require('express');
const { Telegraf } = require('telegraf');
const axios = require('axios');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware для парсинга JSON
app.use(express.json());

// Приветственное сообщение
bot.start((ctx) => {
    const welcomeMessage = `
🤖 Привет! Меня зовут АИ-помощник!
Я создан разработчиком Алексеем как мини ИИ-помощник на базе Google Gemini AI.

✨ Что я умею:
• Отвечать на вопросы
• Помогать с задачами
• Объяснять сложные темы
• Генерировать идеи
• И многое другое!

Просто напишите мне любой вопрос, и я постараюсь помочь! 😊

Разработчик: @alexey_dev (Алексей)
`;
    ctx.reply(welcomeMessage);
});

// Команда помощи
bot.help((ctx) => {
    const helpMessage = `
📖 Как использовать бота:
1️⃣ Просто напишите любой вопрос
2️⃣ Я отвечу используя ИИ Google Gemini
3️⃣ Можете задавать follow-up вопросы

🔥 Примеры вопросов:
• "Объясни квантовую физику простыми словами"
• "Как приготовить пасту карбонара?"
• "Напиши код на Python для сортировки массива"
• "Дай совет по изучению программирования"

⚡ Бот работает на бесплатном API и доступен всем!
    `;
    ctx.reply(helpMessage);
});

// Функция для отправки запроса к Gemini API
async function askGemini(question) {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: question
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data.candidates && response.data.candidates[0]) {
            return response.data.candidates[0].content.parts[0].text;
        } else {
            return "Извините, не удалось получить ответ от ИИ. Попробуйте еще раз.";
        }
    } catch (error) {
        console.error('Ошибка при обращении к Gemini API:', error.response?.data || error.message);
        
        if (error.response?.status === 429) {
            return "⏰ Слишком много запросов. Подождите немного и попробуйте снова.";
        } else if (error.response?.status === 403) {
            return "🔑 Проблема с API ключом. Обратитесь к разработчику.";
        } else {
            return "❌ Произошла ошибка. Попробуйте переформулировать вопрос.";
        }
    }
}

// Обработка всех текстовых сообщений
bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;
    
    // Показываем, что бот печатает
    await ctx.sendChatAction('typing');
    
    try {
        const aiResponse = await askGemini(userMessage);
        
        // Ограничиваем длину ответа (Telegram имеет лимит 4096 символов)
        if (aiResponse.length > 4000) {
            const truncatedResponse = aiResponse.substring(0, 4000) + "...\n\n📝 Ответ был сокращен из-за ограничений Telegram.";
            await ctx.reply(truncatedResponse);
        } else {
            await ctx.reply(aiResponse);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        await ctx.reply("😔 Извините, произошла ошибка. Попробуйте еще раз.");
    }
});

// Обработка других типов сообщений
bot.on('sticker', (ctx) => {
    ctx.reply('🎭 Классный стикер! Но я пока умею работать только с текстом. Задайте мне вопрос!');
});

bot.on('photo', (ctx) => {
    ctx.reply('📸 Красивое фото! Но пока я умею работать только с текстом. Опишите что-нибудь словами!');
});

bot.on('voice', (ctx) => {
    ctx.reply('🎤 Извините, я пока не умею обрабатывать голосовые сообщения. Напишите текстом!');
});

// Роут для проверки здоровья сервера
app.get('/', (req, res) => {
    res.send('🤖 Telegram Bot Server is running!');
});

// Webhook для Telegram
app.post('/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log('🤖 Bot is ready!');
});

// Graceful stop
process.once('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully');
    process.exit(0);
});

process.once('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully');
    process.exit(0);
});