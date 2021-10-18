import passport from 'passport';

export const loginAuth = (req, res, next) => {

}
export const jwtAuth = (req, res, next) => {
    return passport.authenticate('jwt', {
        session: false,
    })(req, res, next)
}