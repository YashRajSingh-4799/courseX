import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../../store/atom";
import { USER_LOGIN_URL } from "../../utils/constant";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      axios
        .post(USER_LOGIN_URL, null, {
          headers: {
            username,
            password,
          },
        })
        .then((res) => {
          setMessage(res.data.message);
          setUsername("");
          setPassword("");
          setUser(username);
          localStorage.setItem("token", res.data.token);
        })
        .catch((err) => setMessage(err.response.data.message));
    } else {
      setMessage("Username and Password are required");
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
            Login
          </h1>
          {message ? (
            <div className="text-center mt-4">
              <span className="text-lg text-gold-900">{message}</span>
              <br />
              {message === "Logged in successfully" ? (
                <Link
                  className="text-lg text-gold-900"
                  to={`/${user}/dashboard`}
                >
                  Go to dashboard
                </Link>
              ) : (
                ""
              )}
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
                Login
              </button>
            </div>
          </form>
          <footer className="mt-8">
            <p className="text-sm text-center text-royal-green-600">
              Not Registerd yet?{" "}
              <Link className="text-gold-900" to="/signup">
                Register here
              </Link>
            </p>
          </footer>
        </>
      )}
    </section>
  );
}

export default Signup;
