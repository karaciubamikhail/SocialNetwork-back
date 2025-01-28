const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, passwordHash: hashedPassword });
    res.json({ message: "User registered" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получить информацию о текущем пользователе
exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);  // Достаём пользователя по ID из токена
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ id: user.id, username: user.username, email: user.email });  // Отправляем данные пользователя
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};