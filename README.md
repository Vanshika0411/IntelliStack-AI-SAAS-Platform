# IntelliStack AI

**IntelliStack AI** is a fully functional AI SaaS application built using the **PERN stack (PostgreSQL, Express, React, Node.js)**. This platform provides a variety of AI-powered tools with secure user authentication and subscription-based access to premium features. The app is designed for seamless user experience and efficient AI interactions.

[Live Demo Link](#) *(https://intelli-stack-ai-saas-platform.vercel.app/)*

---

## 🔹 Project Overview

IntelliStack AI allows users to access multiple AI-driven tools directly from the browser. Users can create an account, manage subscriptions, and use AI tools such as content generation, image editing, resume analysis, and more. The application is built with scalability in mind, leveraging modern web technologies and serverless databases.

---

## 🔹 Key Features

* **User Authentication:** Secure sign-up, sign-in, and profile management powered by **Clerk**.
* **Subscription Billing:** Access premium AI features through subscription plans.
* **Database:** Serverless **PostgreSQL** database hosted on **Neon** for efficient data storage.
* **Responsive UI:** Built with **React** to provide a smooth, user-friendly experience.

---

## 🔹 AI-Powered Tools

1. **Article Generator:** Generate high-quality articles by providing a title and length.
2. **Blog Title Generator:** Create engaging blog titles based on keywords and category.
3. **Image Generator:** Generate images from user prompts using advanced AI models.
4. **Background Remover:** Upload images and remove the background automatically.
5. **Image Object Remover:** Remove specific objects from any image by describing the object.
6. **Resume Analyzer:** Upload resumes and receive a complete AI-based analysis.

---

## 🔹 Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js + Express.js
* **Database:** PostgreSQL (Serverless via Neon)
* **Authentication:** Clerk
* **AI Integration:** OpenAI / Hugging Face API (or other AI APIs for content/image generation)
* **Deployment:** Render (or Vercel/Netlify for frontend)

---

## 🔹 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/yourusername/intellistack-ai.git
```

2. Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

3. Set up environment variables (.env) for database, Clerk, and AI API keys.

4. Start the backend server:

```bash
npm run server
```

5. Navigate to the client folder and start the frontend:

```bash
cd client
npm install
npm start
```

6. Open your browser at `http://localhost:3000` to use IntelliStack AI.

---

## 🔹 Live Demo

Experience IntelliStack AI online: [Live Demo Link](#) *(https://intelli-stack-ai-saas-platform.vercel.app/)*
