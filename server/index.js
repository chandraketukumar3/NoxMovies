require('dotenv').config()
require('express-async-errors')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const movieRoutes = require('./routes/movieRoutes')
const userRoutes = require('./routes/userRoutes')

const { errorHandler, notFound } = require('./middleware/errorMiddleware')

const app = express()

connectDB()

const allowedOrigins = [
  "https://noxxmovies.vercel.app",
  "https://noxxmovies.vercel.app/",
  "http://localhost:5173"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin) || origin?.includes(".vercel.app")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/movies', movieRoutes)
app.use('/api/users', userRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NoxMovies API is running', env: process.env.NODE_ENV })
})

app.use(notFound)

app.use(errorHandler)

// Export for Vercel but listen locally
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

module.exports = app