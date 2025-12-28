# 🤖 Telegram News & History Bot

A full-stack Telegram chatbot backend that fetches news headlines and maintains a persistent search history for users.

## 🚀 Features
* **Real-time News:** Integrates with **NewsAPI** to fetch top headlines based on user categories (e.g., sports, technology).
* **Database Integration:** Uses **Firebase Firestore** to store and retrieve search history.
* **User History:** Users can query their history by specific dates using the `Get` command.
* **Secure Architecture:** Implements environment variables to protect sensitive API keys and service accounts.
## 📖 User Guide (How to interact)
Open telegram and search for fsd401 and start it.
Once the bot is running, you can use these commands in the Telegram chat,:
1. **Get Latest News:** Just type a category (e.g., `technology`, `sports`, `business`).
   * *Example:* `sports` 
2. **Save to History:** Type `Insert [category] [YYYY-MM-DD]` to save a search.
   * *Example:* `Insert business 2025-12-28`
3. **Retrieve History:** Type `Get [YYYY-MM-DD]` to see what you searched for on that day.
   * *Example:* `Get 2025-12-28`

## 🛠️ Tech Stack
* **Language:** Node.js
* **Database:** Google Firebase (Firestore)
* **API:** Telegram Bot API & NewsAPI
* **Libraries:** `node-telegram-bot-api`, `firebase-admin`, `dotenv`, `request`

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
   cd YOUR_REPO_NAME
2.**install Dependencies:**

####Bash:npm install
Configure Environment Variables: Create a .env file in the root directory and add your secret keys:
TELEGRAM_TOKEN=your_bot_token_here
NEWS_API_KEY=your_newsapi_key_here
Add Firebase Credentials: Place your Firebase service account file (Key.json) in the root folder. (Note: This file is ignored by git for security).
###Run the Bot:
   ####Bash:node index.js
## 🔒 Security Note
The .gitignore file ensures that sensitive files like .env and Key.json are never uploaded to GitHub, protecting the developer's private API credentials.
