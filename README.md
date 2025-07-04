# CulturaSphere

CulturaSphere is a platform that connects people through cultural experiences, tastes, and trends.

## Features

- **FlavorFusion**: Discover culinary connections and explore new tastes based on your preferences.
- **TrendWeaver**: Connect with cultural trends across music, art, fashion, and entertainment.
- **TasteQuill**: Express your cultural experiences and connect with others through creative writing.

## Project Structure

```
CulturaSphere/
├── client/                            # React.js frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/                    # Images, icons, etc.
│   │   ├── components/                # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── TasteCard.jsx
│   │   ├── pages/                     # Main views
│   │   │   ├── Home.jsx
│   │   │   ├── FlavorFusion.jsx
│   │   │   ├── TrendWeaver.jsx
│   │   │   ├── TasteQuill.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/                  # Axios API calls to backend
│   │   │   └── api.js
│   │   ├── styles/                    # CSS or Tailwind config
│   │   │   └── main.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                           # Frontend environment variables
│   └── package.json
│
├── server/                            # Node.js backend
│   ├── controllers/                   # Route logic (handlers)
│   │   ├── flavorFusionController.js
│   │   ├── trendWeaverController.js
│   │   └── tasteQuillController.js
│   ├── routes/                        # Express routes
│   │   ├── flavorFusionRoutes.js
│   │   ├── trendWeaverRoutes.js
│   │   └── tasteQuillRoutes.js
│   ├── models/                        # MongoDB models
│   │   └── User.js
│   ├── services/                      # External API clients
│   │   ├── groqService.js             # Interacts with Groq LLM
│   │   └── qlooService.js             # Interacts with Qloo API
│   ├── utils/                         # Helper functions
│   │   └── tasteUtils.js
│   ├── config/                        # Config files (DB, API keys)
│   │   ├── db.js
│   │   └── keys.js
│   ├── middleware/                    # Auth, error handling, etc.
│   │   └── errorHandler.js
│   ├── app.js                         # Express app config
│   ├── server.js                      # Entry point
│   ├── .env                           # Backend environment variables
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                       # Monorepo (optional)
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional, for database functionality)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/CulturaSphere.git
   cd CulturaSphere
   ```

2. Install dependencies for both client and server:
   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both client and server directories based on the provided examples

4. Start the development servers:
   ```
   # Start the backend server
   cd server
   npm run dev

   # In a new terminal, start the frontend
   cd client
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the application

## Technologies Used

### Frontend
- React.js
- React Router
- Axios
- CSS/SCSS

### Backend
- Node.js
- Express
- MongoDB (optional)
- Groq API (for LLM capabilities)
- Qloo API (for taste recommendations)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Groq for providing LLM capabilities
- Qloo for taste graph API
