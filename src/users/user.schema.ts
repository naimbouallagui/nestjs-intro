/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;
export const userSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
})
// let user:any
userSchema.pre("save", function(next) {
     const user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user['password'], salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user['password'] = hash;
        next();
    });
});


});

userSchema.methods.comparePassword = (candidatePassword, userPass, cb) => {
     return bcrypt.compareSync(candidatePassword, userPass);
};
export const UserSchema = userSchema;