const express = require("express");
const cors = require("cors");
const sequelize = require('./config/database');

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const { checkAuth } = require("./middleware/authMiddleware");
require("dotenv").config();
console.log("Database URL:", process.env.DB_NAME);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();