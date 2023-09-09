const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "FirstName must be Required"]

    },
    lastName: {
        type: String,
        required: [true, "LastName must be Required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email must be Required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    },
    cars : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref : "Car"
    }],

    isAdmin: {
        type: Boolean,
        default : false
    },
    rentRequests : {
        type: Array,
        default: []
    }



}, { timestamps: true });



UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});
UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});
module.exports= mongoose.model('User', UserSchema);
 // = User