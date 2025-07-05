# CulturaSphere

CulturaSphere is a platform that connects people through cultural experiences, tastes, and trends.

## Features

- **FlavorFusion**: Discover culinary connections and explore new tastes based on your preferences.
  - Cultural Itinerary Composer (LLM-Powered)
  - Taste-Aligned Travel Personas
  - Taste-to-Geo Visualizer
  - Dynamic Dining Moodboard
  - Live Taste Trip Simulator
  - Local Vibes Decoder
  - Mood Blending Engine
  - Travel PDF Generator
  - Post-Trip Story Mode
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
│   │   │   ├── TasteCard.jsx
│   │   │   └── flavor-fusion/         # FlavorFusion components
│   │   │       ├── CulturalItineraryComposer.jsx
│   │   │       ├── TasteAlignedPersonas.jsx
│   │   │       ├── TasteToGeoVisualizer.jsx
│   │   │       ├── DynamicDiningMoodboard.jsx
│   │   │       ├── LiveTasteTripSimulator.jsx
│   │   │       ├── LocalVibesDecoder.jsx
│   │   │       ├── MoodBlendingEngine.jsx
│   │   │       ├── TravelPDFGenerator.jsx
│   │   │       └── PostTripStoryMode.jsx
│   │   ├── pages/                     # Main views
│   │   │   ├── Home.jsx
│   │   │   ├── FlavorFusion.jsx
│   │   │   ├── TrendWeaver.jsx
│   │   │   ├── TasteQuill.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/                  # Axios API calls to backend
│   │   │   └── api.js
│   │   ├── styles/                    # CSS or Tailwind config
│   │   │   ├── main.css
│   │   │   ├── flavor-fusion.css
│   │   │   └── flavor-fusion-features-*.css
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
│   ├── uploads/                       # Uploaded files storage
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

## FlavorFusion Advanced Features

### Cultural Itinerary Composer (LLM-Powered)
Generate a themed multi-day travel plan that adapts to the user's cultural tastes and chosen travel pace.
- Itinerary broken down into "Morning," "Afternoon," "Evening" slots
- Each slot includes a culturally relevant suggestion: museum, local dish, hidden spots
- Groq LLM narrates why each location matches user tastes
- Travel mode customization: walking, cycling, scenic drive, public transport

### Taste-Aligned Travel Personas
Use Groq + Qloo to dynamically generate a travel persona based on the user's input.
- Examples: "Urban Bohemian Explorer", "Cinematic Minimalist Nomad", "Folklore + Forest Lover"
- Each persona unlocks custom travel style suggestions, boutique hotel + café pairings, and Spotify playlist + book recommendations

### Taste-to-Geo Visualizer
Interactive map feature that visualizes how a user's taste maps to global destinations using Qloo affinity data.
- Example: Coldplay + Murakami + Sushi → Highlight Tokyo, Amsterdam, and Reykjavik
- React map with destination "heat zones" showing match intensity

### Dynamic Dining Moodboard
Let the user build a dining aesthetic from taste tags or mood inputs, then generate:
- A curated dining list (fusion cafés, hole-in-the-wall spots, avant-garde chefs)
- Sample menus with Groq-simulated dish descriptions
- Ambience previews with suggested Spotify music & lighting themes

### Live Taste Trip Simulator
Interactive LLM chat that simulates a narrated travel experience.
- Example Prompt: "What would it feel like to spend 2 days in Istanbul if I love Agatha Christie and vintage soul music?"
- Groq LLM replies with a cinematic walkthrough of the journey, integrating Qloo-influenced stops, dishes, and storylines

### Local Vibes Decoder
For each recommended location, display:
- Cultural norms
- Fashion, slang, or dining etiquette
- Suggested local events that match the user's style
- Groq LLM interprets and explains local culture in user-friendly tone

### Mood Blending Engine
Let users combine mood + taste for nuanced planning.
- Examples: "Melancholic + Cyberpunk" → Tokyo with rainy café tours, late-night ramen, ambient electronica
- "Romantic + Bollywood" → Jaipur with rooftop dining, Hindi poetry pop-ups, and rose gardens

### Travel PDF Generator
Downloadable, custom PDF with:
- Mini phrasebook (in local language)
- Cultural do's and don'ts
- Daily plan overview
- Music & reading recommendations
- All written in an LLM-generated personalized narrative voice

### Post-Trip Story Mode (LLM Reflection Engine)
After returning, user can:
- Upload photos / add journal notes
- Groq LLM writes a short story or poetic log of the trip, referencing taste and experiences
- Can be turned into shareable web story / print-friendly zine

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
