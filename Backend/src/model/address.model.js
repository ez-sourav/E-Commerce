import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        mobile: {
            type: String,
            required: true,
            trim: true,
        },

        houseNo: {
            type: String,
            default: "",
            trim: true,
        },

        building: {
            type: String,
            default: "",
            trim: true,
        },

        landmark: {
            type: String,
            default: "",
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        state: {
            type: String,
            required: true,
            trim: true,
        },

        postalCode: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            default: "India",
            trim: true,
        },

        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
const Address = mongoose.model("Address", addressSchema);
export default Address;