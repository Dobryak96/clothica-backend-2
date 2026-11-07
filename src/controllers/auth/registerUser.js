import bcrypt from 'bcrypt';
import { UserModel } from '../../models/user.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body ?? {};

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string'
    ) {
      return res.status(400).json({
        message: 'Усі поля обов’язкові',
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) {
      return res.status(400).json({
        message: 'Ім’я має містити щонайменше 2 символи',
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({
        message: 'Некоректна електронна пошта',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Пароль має містити щонайменше 8 символів',
      });
    }

    const existingUser = await UserModel.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'Користувач із такою електронною поштою вже існує',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'Реєстрація успішна',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {

    if (error.code === 11000) {
      return res.status(409).json({
        message: 'Користувач із такою електронною поштою вже існує',
      });
    }

    next(error);
  }
};