/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the post
 *         mediaUrl:
 *           type: string
 *           description: The URL of the media file
 *         authorId:
 *           type: integer
 *           description: The ID of the user who created the post
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Post = sequelize.define("Post", {
  content: { type: DataTypes.TEXT, allowNull: false },
  mediaUrl: { type: DataTypes.STRING, allowNull: true },
});

Post.belongsTo(User, { foreignKey: "authorId", as: "author" });

module.exports = Post;