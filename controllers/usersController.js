import User from "../models/users.js";
import bcrypt from "bcrypt";

// READ ALL
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get users",
            error: error.message,
        });
    }
};

// READ ONE
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get user",
            error: error.message,
        });
    }
};

// CREATE
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
        });

        const userResponse = user.toObject();
        delete userResponse.password;
        res.status(201).json({
            message: "User created successfully",
            user: userResponse,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        })
    }
};

// UPDATE
export const updateUser = async (req, res) => {
    try {
        const { name, email, password, phoneNum } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password, phoneNum },
            {
                new: true,
                runValidators: true,
            }
        )

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update user",
            error: error.message,
        });
    }
};

// DELETE
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete user",
            error: error.message,
        });
    }
};