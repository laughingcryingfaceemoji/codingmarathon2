const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Sign JWT for authenticated user
const signToken = (_id) => jwt.sign({ _id }, process.env.SECRET, { expiresIn: '7d' });

// POST /api/users/login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        const token = signToken(user._id);
        res.json({ id: user._id, name: user.name, email: user.email, token });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// GET /api/users
exports.getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password');
        res.json(users);
    } catch (err) {
        console.error('Get all users error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Get user error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// POST /api/users/signup
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, phone_number, gender, date_of_birth, membership_status } = req.body;
        const user = await User.signup(name, email, password, phone_number, gender, date_of_birth, membership_status);
        const token = signToken(user._id);
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Update user error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Delete user error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


