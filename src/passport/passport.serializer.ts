import * as passport from 'passport';

export abstract class PassportSerializer {
    abstract serializeUser(user:any, done: any);
    abstract deserializeUser(payload: any, done: any);
    constructor() {
        passport.serializeUser((user, done) => {
            this.serializeUser(user, done);
        })
        passport.deserializeUser((payload, done) => {
            this.deserializeUser(payload, done);
        });
    }
}