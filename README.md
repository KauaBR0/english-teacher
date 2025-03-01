# Write & Improve - English IA

Write & Improve is an English writing improvement application that provides AI-powered feedback on grammar, structure, and vocabulary. The application uses Google's Gemini AI to analyze text and provide detailed writing feedback.

## Features

- **AI-Powered Writing Feedback**: Get instant feedback on your English writing using Google's Gemini AI
- **Grammar Analysis**: Detailed feedback on grammatical errors and suggestions
- **Vocabulary Usage**: Recommendations for better word choices and vocabulary improvement
- **Sentence Structure**: Analysis of sentence construction and flow
- **User Authentication**: Secure JWT-based authentication system
- **Word Counter**: Real-time word count tracking
- **Writing Timer**: Track time spent on writing tasks
- **Responsive Design**: Mobile-friendly interface

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- Google Gemini API Key

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3000
   ```

## Usage

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Start the production server:
   ```bash
   npm start
   ```
3. Access the application at `http://localhost:3000`

### Demo Credentials
- Username: demo
- Password: demo123

## API Endpoints

### Authentication

```
POST /api/login
Body: { username: string, password: string }
Response: { token: string }
```

### Writing Feedback

```
POST /api/feedback
Headers: { Authorization: "Bearer {token}" }
Body: { text: string }
Response: { feedback: string }
```

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **AI Integration**: Google Generative AI (Gemini)
- **Development**: Nodemon for hot-reloading

## Project Structure

```
├── public/           # Static files
│   ├── index.html    # Main HTML file
│   ├── styles.css    # Stylesheet
│   └── app.js        # Frontend JavaScript
├── server.js         # Express server and API endpoints
├── package.json      # Project dependencies
└── .env             # Environment variables
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.