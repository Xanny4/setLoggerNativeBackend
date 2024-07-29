const bcrypt = require('bcrypt');
const userService = require('../services/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
}

module.exports = {
    getUser: async (req, res) => {
        try {
            const user = await userService.getUser(req.userId);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        }
        catch (err) {
            res.status(500).send(err);
        }

    },

    authenticate: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.authenticate(email, password);
            if (user) {
                const token = generateToken(user);
                res.status(200).json({ token, user, message: 'Login successful!' });
            } else {
                res.json({ message: 'Invalid email or password. Please try again.' });
            }
        }
        catch (err) {
            res.status(500).send(err);
        }

    },
    confirmPassword: async (req, res) => {
        try {
            const id = req.userId;
            const { password } = req.body;
            const confirmation = await userService.confirmPassword(id, password);
            res.status(200).json(confirmation);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password)
                return res.status(400).json({ error: "All fields are required." });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await userService.createUser({
                username,
                email,
                password: hashedPassword,
            });
            res.status(201).json(newUser);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    modifyUser: async (req, res) => {
        try {
            const id = req.userId;
            const user = req.body;
            const response = await userService.modifyUser(user, id);
            res.status(200).json(response);
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.params.id;
            await userService.deleteUser(id);
            res.status(200).json({ message: "User deleted" });
        }
        catch (err) {
            res.status(500).send(err);
        }
    },
}