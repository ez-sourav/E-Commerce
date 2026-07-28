import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

    password: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        default: "",
    },

    address: {
        fullName: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        street: {
            type: String,
            default: "",
        },
        city: {
            type: String,
            default: "",
        },
        state: {
            type: String,
            default: "",
        },
        pincode: {
            type: String,
            default: "",
        },
        country: {
            type: String,
            default: "India",
        },
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true });
const User = mongoose.model("User",userSchema)

export default User;