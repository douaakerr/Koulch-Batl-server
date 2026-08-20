import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
        },
        avatar: {
            type: String,
            default: null,
        },
        password: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            enum: ["user", "seller", "admin"],
            default: "user",
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);