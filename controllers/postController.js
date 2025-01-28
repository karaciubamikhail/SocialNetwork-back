const Post = require("../models/Post");


const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Папка для загрузки файлов
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя для файла
  },
});

const upload = multer({ storage });

const path = require("path");


exports.createPost = [
  upload.single("media"), // Обрабатываем один файл с именем поля "media"
  async (req, res) => {
    try {
      const { content } = req.body;
      const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null; // Если есть файл, добавляем URL

      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      // Используем авторизацию и создаем пост
      const post = await Post.create({
        content,
        mediaUrl,
        authorId: req.user.id, // ID пользователя из JWT
      });

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: "author" });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};