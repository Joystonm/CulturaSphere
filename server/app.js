const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const flavorFusionRoutes = require('./routes/flavorFusionRoutes');
const trendWeaverRoutes = require('./routes/trendWeaverRoutes');
const tasteQuillRoutes = require('./routes/tasteQuillRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/flavor-fusion', flavorFusionRoutes);
app.use('/api/trend-weaver', trendWeaverRoutes);
app.use('/api/taste-quill', tasteQuillRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to CulturaSphere API' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
