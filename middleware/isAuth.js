const jwt = require("jsonwebtoken");
const User = require("../models/user");

const isAuth = async (req, res, next) => {
  try {
    //step: check if you have a token
    const token = req.headers["auth-token"];
    if (!token) {
      return res.status(400).json({ msg: "you are not authentificated" });
    }

    //extract the user is from the token
    const decodedToken =await  jwt.verify(token, process.env.TOKENKEY); // => an object with the payload

    const id = decodedToken.id;
    //find the user with this specific id in the db
    const user = await User.findById(id);
    res.status(200).json(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports=isAuth