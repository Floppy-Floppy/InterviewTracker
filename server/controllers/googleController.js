const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const googleController = {

userGoogleLogin: async (req, res, next) => {
  try {
    // saving user's input
    
    const email = req.user.profile.emails[0].value;
    const username = req.user.profile.displayName;
    // check if email already exists in mongodb
    let user = await User.findOne({ email });
    if (!user){
      // create a new user
      const newUser = new User({ username, email, password: 'googlepassword' });
      //to save a new user in mongoDB
      await newUser.save();        
      user = await User.findOne({ email });
    }
    
    const payload = {
      id: user._id,
      name: user.username,
    };
    // create a token, it expires in 1 day, you can change it to anytime
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });
    // send this token in the front end
    return res.json({ token });
  } 
  
  catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
},
}

module.exports = googleController;