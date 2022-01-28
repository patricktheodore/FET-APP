const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true,
        trim: true
    },
    last_name: { 
        type: String,
        required: true,
        trim: true 
    },
    date_of_birth: { 
        type: Date 
    },
    is_coach: { 
        type: Boolean, 
        default: false 
    },
    email: { 
        type: String,
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
        required: true,
        minlength: 8 
    },
    created_at: { 
        type: String, 
        default: Date.now 
    }
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.virtual('token').get(function () {
    
    return this.comments.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;