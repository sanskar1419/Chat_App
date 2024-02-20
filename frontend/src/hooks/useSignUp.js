import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    name,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      name,
      userName,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });

      // Collecting the response that we are getting from server
      const data = await res.json();

      // If there are some error from server side we will also display it in
      if (data.error) {
        throw new Error(data.error);
      }

      //   Setting the auth user to local storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};
export default useSignup;

function handleInputErrors({
  name,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  var passwordExpression =
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
  if (!name || !userName || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (!passwordExpression.test(password)) {
    toast.error(
      "Password should contain min 7 letter password, with at least a symbol, upper and lower case letters and a number"
    );
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 7) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
