const User = require("../models/User");
const bcrypt = require('bcrypt')
module.exports = {
    getUser: async (id) => {
        try {
            return await User.findById(id);
        }
        catch {
            console.error("Error finding User:", error);
            throw new Error("Error finding User");
        }
    },
    getAllUsers: async () => {
        const allUsers = await User.find({});
        return allUsers.map(e => ({
            id: e._id,
            name: e.name,
            imageURL: e.imageURL,
        }));
    },
    authenticate: async (email, password) => {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password))
            return user;
    },
    confirmPassword: async (id, password) => {
        const user = await User.findById(id);
        return await bcrypt.compare(password, user.password);
    },
    createUser: async (userData) => {
        try {
            const existingUser = await User.findOne({
                $or: [{ email: userData.email }, { username: userData.username }],
            });

            if (existingUser) {
                if (existingUser.email === userData.email) {
                    return { user: null, message: "Email already exists!" };
                } else {
                    return { user: null, message: "Username is taken!" };
                }
            }

            const newUser = new User(userData);
            const savedUser = await newUser.save();
            return { user: savedUser, message: "User created successfully!" };
        } catch (error) {
            console.error("Error creating User:", error);
            throw new Error("Error creating User");
        }
    },

    modifyUser: async (userData, id) => {
        try {
            const existingUserByEmail = await User.findOne({ email: userData.email, _id: { $ne: id } });
            const existingUserByUsername = await User.findOne({ username: userData.username, _id: { $ne: id } });

            let errors = {};
            if (existingUserByEmail)
                errors.email = "Email already exists!";
            if (existingUserByUsername)
                errors.username = "Username is taken!";

            if (Object.keys(errors).length !== 0)
                return { user: null, errors };

            const updatedUser = await User.findByIdAndUpdate(
                id,
                userData,
                { new: true }
            );

            if (!updatedUser)
                throw new Error("User not found");

            return { user: updatedUser, message: "User Updated!" };
        }
        catch (error) {
            console.log(error);
            throw new Error("Error updating User", error);
        }
    },
    deleteUser: async (id) => {
        try {
            const user = await User.findByIdAndDelete(id);

            if (!user)
                throw new Error("User not found");
        }
        catch (error) {
            console.log(error);
            throw new Error("Error deleting a user", error);
        }
    }
}