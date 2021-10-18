import pass from 'passport';
import Users from '../components/users/models/UsersModel.mjs';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'sekret' //process.env.JWT_SECRET --- TODO: nie działa ładowanie z process.env SPRAWDZIĆ
}

function verifyCallback(payload, done) {
    return Users.findOne({
            _id: payload.id
        })
        .then(user => {
            return (done(null, user))
        })
        .catch(error => {
            console.log('blad')
            return done(error)
        })
}

const passport = () => {
    pass.use(Users.createStrategy())
    pass.use(new JWTStrategy(config, verifyCallback))
}
export default passport