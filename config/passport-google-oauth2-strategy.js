const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy({
    clientID:"426625348845-n8umsujbb06h578e0agfakat1j2kjvfl.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"

},
(accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile.emails[0].value })
      .then((user) => {
        console.log(profile);
        if (user) {
          return done(null, user);
        } else {
          User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          })
            .then((user) => {
              signUpMailer.signUp(user);
              return done(null, user);
            })
            .catch((error) => {
              console.log(
                "Error in creating user using passport-google-strategy: ",
                error
              );
            });
        }
      })
      .catch((error) => {
        console.log(
          "Error in finding user using passport-google-strategy: ",
          error
        );
      });
  }
)
);

module.exports = passport;






// function(accessToken,refreshToken,profile,done){
//     User.findOne({email:profile.emails[0].value}).exec(
//         function(err,user){
//             if(err){console.log('error in google strategy passport',err);return;}
//             console.log(profile);
//             if(user){
//                 console.log(user);
//                 return done(null,user);
//             }else{
//                 User.create({
//                     name:profile.displayName,
//                     email:profile.emails[0].value,
//                     passport:crypto.randomBytes(20).toString('hex')                    
//                 },
//                 function(err,user){
//                     if(err){console.log('error in creating usergoogle strategy-passport',err); return;}
//                     return done(null,user);
//                 });
//             }
//         }
//     );
// }
// ));