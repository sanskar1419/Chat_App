import User from "../models/user.model.js";

export default class UserController {
  async getSideBarMessage(req, res) {
    try {
      const loggedInUserId = req.user._id;
      // Finding all the other user, other then loggedIn user
      const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
        "-password"
      );
      res.status(200).json(allUsers);
    } catch (err) {
      console.log("Error in getSideBarMessage Controller", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}
