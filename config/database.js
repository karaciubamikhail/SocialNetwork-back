/**
 * @swagger
 * components:
 *   schemas:
 *     DatabaseConfig:
 *       type: object
 *       properties:
 *         DB_NAME:
 *           type: string
 *           description: Название базы данных.
 *         DB_USER:
 *           type: string
 *           description: Имя пользователя для подключения к базе данных.
 *         DB_PASSWORD:
 *           type: string
 *           description: Пароль пользователя для подключения к базе данных.
 *         DB_HOST:
 *           type: string
 *           description: Хост базы данных (например, localhost или IP-адрес).
 *         DB_PORT:
 *           type: integer
 *           description: Порт для подключения к базе данных.
 *         DB_DIALECT:
 *           type: string
 *           description: Диалект базы данных (например, mysql, postgres).
 */

/**
 * @swagger
 * /api/database/config:
 *   get:
 *     summary: Get database connection configuration
 *     description: Возвращает конфигурацию для подключения к базе данных.
 *     responses:
 *       200:
 *         description: Конфигурация базы данных успешно получена
 *       500:
 *         description: Ошибка при получении конфигурации базы данных
 */
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

module.exports = sequelize;