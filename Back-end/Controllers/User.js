import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../Models/User.js';

export const getUsers = async (req, res) => {
  try{
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById = async (req, res) => {
  try{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'user not found' });
    }

    const user = await User.findById(id);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'User not found!' });
    }

    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!user) {
      return res.status(404).json({ error: 'couldnt update user!' });
    }

    res.status(200).json({ message: 'User was updated successfully!', user });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'User not found!' });
    }

    const user = await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User was deleted successfully!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);

  try {
    const existing_user = await User.findOne({ username });
    if (existing_user) {
      return res.status(400).json({ message: 'Username already in use!' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match!' });
    }

    const user = await User.create({ //role will be assigned in front end
      username,
      password: hashed_password
    });

    res.status(201).json({ message: 'User created successfully!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const secretKey = process.env.JWT_SECRET;

  try {
    if (!secretKey) {
      throw new Error('JWT secret key not configured.');
    }
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password!' });
    }

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '12h' });
    res.status(200).json({ message: 'Logged in Successfully!', token });

  } catch (error) {
    res.status(500).json(error)
  }
};