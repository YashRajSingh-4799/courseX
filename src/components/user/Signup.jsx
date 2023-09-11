import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../store/atom";
import { USER_SIGNUP_URL } from "../../utils/constant";

function Signup() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && username && password) {
      axios
        .post(USER_SIGNUP_URL, {
          email,
          username,
          password,
        })
        .then((res) => {
          setMessage(res.data.message);
          setUsername("");
          setEmail("");
          setPassword("");
          localStorage.setItem("token", res.data.token);
          setUser(username);
        })
        .catch((err) => setMessage("User already exists"));
    } else {
      setMessage("All fields required");
    }
  };

  return (
    <section className="py-32 bg-fade-pink h-screen px-6">
      {user ? (
        <div className="text-center">
          <h2 className="text-2xl">You are logged in</h2>
          <Link
            className="text-lg text-gold-900 mt-4 inline-block"
            to={`/${user}/dashboard`}
          >
            Go to dashboard
          </Link>
        </div>
      ) : (
        <>
          <h1 className="text-center text-royal-green-900 font-bold text-xl">
            Register
          </h1>
          {message ? (
            <div className="text-center mt-4">
              <span className="text-lg text-gold-900">{message}</span>
              <br />
              <Link className="text-lg text-gold-900" to={`/${user}/dashboard`}>
                Go to dashboard
              </Link>
            </div>
          ) : (
            ""
          )}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-12 max-w-sm mx-auto w-full"
            action=""
          >
            <input
              autoFocus
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-center mt-4">
              <button
                onClick={(e) => handleSubmit(e)}
                className="px-6 py-3 text-md bg-royal-green-900 text-white rounded w-full"
              >
                Register
              </button>
            </div>
          </form>
          <footer className="mt-8">
            <p className="text-sm text-center text-royal-green-600">
              Already have an account?{" "}
              <Link className="text-gold-900" to="/login">
                Login here
              </Link>
            </p>
          </footer>
        </>
      )}
    </section>
  );
}

export default Signup;
