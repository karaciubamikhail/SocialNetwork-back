const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User");

const Post = sequelize.define("Post", {
  content: { type: DataTypes.TEXT, allowNull: false },
  mediaUrl: { type: DataTypes.STRING, allowNull: true },
});

Post.belongsTo(User, { foreignKey: "authorId", as: "author" });

module.exports = Post;