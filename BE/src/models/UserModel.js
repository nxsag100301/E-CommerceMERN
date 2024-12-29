const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, required: false },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: String, required: false },
        address: { type: String, required: false },
        access_token: { type: String, required: false, default: null },
        refresh_token: { type: String, required: false, default: null },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
