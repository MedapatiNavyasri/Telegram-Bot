require('dotenv').config();
const request = require('request');
const TelegramBot = require('node-telegram-bot-api'); 
const { initializeApp, cert } = require('firebase-admin/app'); 
const { getFirestore } = require('firebase-admin/firestore');

// Configuration from Environment Variables
const token = process.env.TELEGRAM_TOKEN;
const newsAPIKey = process.env.NEWS_API_KEY; 

const bot = new TelegramBot(token, {polling: true}); 

// Firebase Setup
var serviceAccount = require("./Key.json"); 
initializeApp({ credential: cert(serviceAccount) }); 
const db = getFirestore(); 

bot.onText(/\/start/, (mg) => {
    bot.sendMessage(
        mg.chat.id,
        "Welcome to News Bot\n\n" +
        "To search news: type category name (example: business, sports)\n\n" +
        "To store search history:\n" +
        "Insert category YYYY-MM-DD\n" +
        "Example: Insert business 2025-12-18\n\n" +
        "To get search history:\n" +
        "Get YYYY-MM-DD\n" +
        "Example: Get 2025-12-18"
    );
});

bot.on('message', function(mg) {
    if (mg.text === '/start') return;

    const msg = mg.text; 
    const newMsg = msg.split(" "); 

    // Handle "Insert" command
    if (newMsg[0] === 'Insert') { 
        db.collection('search_history').add({ 
            key: newMsg[1],
            date: newMsg[2], 
            userID: mg.from.id 
        }).then(() => { 
            bot.sendMessage(mg.chat.id, newMsg[1] + ' stored successfully');
        });
    } 
    // Handle "Get" command
    else if (newMsg[0] === 'Get') { 
        db.collection('search_history')
          .where('userID', '==', mg.from.id)
          .where('date', '==', newMsg[1])
          .get()
          .then((docs) => { 
            if (docs.empty) { 
                bot.sendMessage(mg.chat.id, "No data found"); 
            } else { 
                docs.forEach((doc) => { 
                    bot.sendMessage(mg.chat.id, "Found: " + doc.data().key);
                });
            }
        }); 
    } 
    // Handle News Search
    else { 
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${mg.text}&language=en&apiKey=${newsAPIKey}`;
        
        request({ url: url, headers: { 'User-Agent': 'TelegramBot' } }, function (error, response, body) {
            try {
                const data = JSON.parse(body); 
                if (data.status === 'ok' && data.articles.length > 0) {
                    const article = data.articles[0];
                    bot.sendMessage(
                        mg.chat.id, 
                        article.title + "\n\n" + 
                        (article.description || "") + "\n\n" + 
                        article.url
                    ); 
                } else { 
                    bot.sendMessage(mg.chat.id, "News not found"); 
                }
            } catch (e) {
                bot.sendMessage(mg.chat.id, "Error parsing news data.");
            }
        });
    } 
});