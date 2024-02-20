import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateJwtToken.js";

export default class AuthController {
  async signUp(req, res) {
    try {
      // console.log(req.body);
      const { name, userName, password, gender } = req.body;
      const user = await User.findOne({ userName });
      if (user) {
        return res.status(400).json({ error: "User Already Exist" });
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

      if (newUser) {
        await newUser.save();
        console.log(newUser);
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          userName: newUser.userName,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({
          error: "Something went wrong",
        });
      }
    } catch (err) {
      console.log("Error in Sign Up Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async login(req, res) {
    // console.log(req.body);
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    if (!user) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        error: "Invalid Credentials",
      });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      userName: user.userName,
      profilePic: user.profilePic,
    });
    try {
    } catch (err) {
      console.log("Error in Login Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
  async logout(req, res) {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({
        message: "Logged out successfully",
      });
    } catch (err) {
      console.log("Error in logout Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
