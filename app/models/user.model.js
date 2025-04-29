import {mongoose, model}  from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,
});
userSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        try {
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
        }
        catch (error) {
            return next(error);
        }
    }
    next();
});
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
userSchema.methods.generateToken = function() {
    const token = JWT.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    return token;
};

const User = model('User', userSchema);
export default User;