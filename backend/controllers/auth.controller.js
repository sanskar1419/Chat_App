import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export default class AuthController {
  async login(req, res) {
    res.send("Welcome to Login Page");
    try {
    } catch (err) {
      console.log(err);
    }
  }
  async signUp(req, res) {
    // console.log(req.body);
    const { name, userName, password, gender } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).send("User Already Exist!!!!!!!");
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const profilePic = gender === "Male" ? boyPic : girlPic;

    const newUser = new User({
      name,
      userName,
      password: hashedPassword,
      gender,
      profilePic,
    });

    await newUser.save();
    console.log(newUser);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      userName: newUser.userName,
      profilePic: newUser.profilePic,
    });

    try {
    } catch (err) {
      console.log("Error in Sign Up Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  async logout(req, res) {
    res.send("Welcome to logout Page");
    try {
    } catch (err) {
      console.log(err);
    }
  }
}
