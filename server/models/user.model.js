const mongoose = require('mongoose');

const UserSchema = mongoose.Schema (
    {
        username: {
            type: String,
            required: [true, "Please enter username"],
            unique: true
        },
        email: {
            type: String,
            required: [true, "Please enter email"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please enter password"]
        },
        role: {
            type: String,
            enum: ['admin', 'manager', 'employee'],
            required: [true, "Please assign a role."]
        }
    }
)

const User = mongoose.model("User", UserSchema);
module.exports = User;