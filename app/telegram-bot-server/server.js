require('dotenv').config();
const express = require('express');
const { Telegraf } = require('telegraf');
const axios = require('axios');

console.log('🚀 Запуск AI Telegram бота...');

// Проверяем переменные окружения
const BOT_TOKEN = process.env.BOT_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!BOT_TOKEN) {
    console.error('❌ BOT_TOKEN не найден! Добавьте его в переменные окружения.');
    process.exit(1);
}

if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY не найден! Добавьте его в переменные окружения.');
    process.exit(1);
}

console.log('✅ Токены найдены');

const app = express();
const bot = new Telegraf(BOT_TOKEN);

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
• Писать код
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
• "Переведи текст на английский"
• "Помоги решить математическую задачу"

⚡ Бот работает на бесплатном API и доступен всем!

🌐 Статус: ${process.env.NODE_ENV || 'development'}
🚀 Хостинг: Railway
    `;
    ctx.reply(helpMessage);
});

// Команда /status
bot.command('status', (ctx) => {
    const statusMessage = `
📊 Статус бота:
✅ Бот: Активен
✅ Gemini AI: Подключен
⏱ Uptime: ${Math.floor(process.uptime())} сек
💾 Node.js: ${process.version}
🌐 Сервер: Онлайн

🤖 Готов к работе!
    `;
    ctx.reply(statusMessage);
});

// Функция для отправки запроса к Gemini API
async function askGemini(question) {
    try {
        console.log('🧠 Отправляем запрос к Gemini AI...');
        
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: `Ответь на русском языке (если вопрос не требует другого языка). Будь дружелюбным и полезным. Вопрос: ${question}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        if (response.data && response.data.candidates && response.data.candidates[0]) {
            const aiResponse = response.data.candidates[0].content.parts[0].text;
            console.log('✅ Получен ответ от Gemini AI');
            return aiResponse;
        } else {
            console.log('⚠️ Пустой ответ от Gemini API');
            return "Извините, не удалось получить ответ от ИИ. Попробуйте еще раз.";
        }
    } catch (error) {
        console.error('❌ Ошибка при обращении к Gemini API:', error.response?.data || error.message);
        
        if (error.response?.status === 429) {
            return "⏰ Слишком много запросов. Подождите немного и попробуйте снова.";
        } else if (error.response?.status === 403) {
            return "🔑 Проблема с API ключом. Обратитесь к разработчику.";
        } else if (error.code === 'ECONNABORTED') {
            return "⏱️ Запрос занял слишком много времени. Попробуйте снова.";
        } else {
            return "❌ Произошла ошибка. Попробуйте переформулировать вопрос.";
        }
    }
}

// Обработка всех текстовых сообщений
bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;
    const userName = ctx.from.first_name || 'Пользователь';
    
    console.log(`💬 Сообщение от ${userName}: ${userMessage}`);
    
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
        console.error('❌ Ошибка:', error);
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

bot.on('document', (ctx) => {
    ctx.reply('📄 Интересный документ! Но я работаю только с текстовыми сообщениями. Скопируйте нужный текст!');
});

// Обработка ошибок бота
bot.catch((err, ctx) => {
    console.error('❌ Ошибка бота:', err);
    ctx.reply('😔 Произошла ошибка. Попробуйте снова.');
});

// === ВЕБЕРВ ===

// Главная страница
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🤖 AI Telegram Bot</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .container {
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 600px;
                width: 90%;
            }
            
            .status {
                background: #d4edda;
                color: #155724;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                border: 2px solid #c3e6cb;
            }
            
            .ai-info {
                background: #e3f2fd;
                color: #1565c0;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                border: 2px solid #bbdefb;
            }
            
            h1 {
                color: #333;
                margin-bottom: 20px;
                font-size: 2.5em;
            }
            
            .emoji {
                font-size: 4em;
                margin-bottom: 20px;
            }
            
            .features {
                text-align: left;
                margin: 20px 0;
            }
            
            .stats {
                display: flex;
                justify-content: space-around;
                margin-top: 20px;
            }
            
            .stat {
                text-align: center;
            }
            
            .stat-number {
                font-size: 1.5em;
                font-weight: bold;
                color: #007bff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="emoji">🤖</div>
            <h1>AI Telegram Bot</h1>
            
            <div class="status">
                <h3>✅ Бот работает и готов помочь!</h3>
                <p>Сервер запущен на порту ${process.env.PORT || 3000}</p>
                <p>Время: ${new Date().toLocaleString('ru-RU')}</p>
            </div>
            
            <div class="ai-info">
                <h3>🧠 Powered by Google Gemini AI</h3>
                <p>Умный помощник, готовый ответить на любые вопросы</p>
            </div>
            
            <div class="features">
                <h3>✨ Возможности бота:</h3>
                <ul>
                    <li>🔍 Отвечает на любые вопросы</li>
                    <li>💡 Генерирует идеи и решения</li>
                    <li>📝 Помогает с написанием текстов</li>
                    <li>💻 Объясняет программирование</li>
                    <li>🌍 Переводит на разные языки</li>
                    <li>🧮 Решает математические задачи</li>
                </ul>
            </div>
            
            <div class="stats">
                <div class="stat">
                    <div class="stat-number">24/7</div>
                    <div>Работает</div>
                </div>
                <div class="stat">
                    <div class="stat-number">🚀</div>
                    <div>Быстро</div>
                </div>
                <div class="stat">
                    <div class="stat-number">🆓</div>
                    <div>Бесплатно</div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `);
});

// API статус
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        bot: 'active',
        ai: 'gemini-connected',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// Webhook для Telegram (если нужен)
app.post('/webhook', (req, res) => {
    bot.handleUpdate(req.body);
    res.sendStatus(200);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;

// Сначала запускаем бота
bot.launch().then(() => {
    console.log('🤖 Telegram бот запущен и готов к работе!');
    
    // Затем запускаем веб-сервер
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🌐 Веб-сервер запущен на порту ${PORT}`);
        console.log(`🚀 Всё готово! Время: ${new Date().toLocaleString('ru-RU')}`);
    });
}).catch((error) => {
    console.error('❌ Ошибка запуска бота:', error);
    process.exit(1);
});

// Graceful shutdown
process.once('SIGINT', () => {
    console.log('🛑 Получен SIGINT, остановка...');
    bot.stop('SIGINT');
    process.exit(0);
});

process.once('SIGTERM', () => {
    console.log('🛑 Получен SIGTERM, остановка...');
    bot.stop('SIGTERM');
    process.exit(0);
});

// Обработка неожиданных ошибок
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});