export default class AuthController {
  async login(req, res) {
    res.send("Welcome to Login Page");
    try {
    } catch (err) {
      console.log(err);
    }
  }
  async signUp(req, res) {
    res.send("Welcome to Signup Page");
    try {
    } catch (err) {
      console.log(err);
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
