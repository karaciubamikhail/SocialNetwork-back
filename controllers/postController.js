/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     description: Creates a post with optional media.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the post
 *               media:
 *                 type: string
 *                 format: binary
 *                 description: The media file associated with the post
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Content is required
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieves a list of all posts with their authors.
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       500:
 *         description: Internal server error
 */


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