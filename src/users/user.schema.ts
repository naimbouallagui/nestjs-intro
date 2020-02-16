/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;
export const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})
let user:any
UserSchema.pre("save", function(next) {
     user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});


});


// UserSchema.methods.comparePassword = (candidatePassword, cb) => {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };