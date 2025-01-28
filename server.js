const express = require("express");
const cors = require("cors");
const sequelize = require('./config/database');

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { checkAuth } = require("./middleware/authMiddleware");
require("dotenv").config();
console.log("Database URL:", process.env.DB_NAME);

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation",
    },
  },
  apis: [
    "./routes/authRoutes.js",    // Путь к маршрутам для авторизации
    "./routes/postRoutes.js",    // Путь к маршрутам для постов
    "./controllers/authController.js",  // Путь к контроллеру для авторизации
    "./controllers/postController.js",  // Путь к контроллеру для постов
    "./middleware/authMiddleware.js",   // Путь к middleware для авторизации
    "./models/Post.js",           // Путь к модели Post
    "./models/User.js",           // Путь к модели User
    "./config/database.js",       // Путь к конфигурации базы данных
  ],
};

const specs = swaggerJsdoc(options);

// Интеграция Swagger с Express
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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