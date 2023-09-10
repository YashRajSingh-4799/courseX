import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom, userCourseAtom } from "../../store/atom";
import jwt_decode from "jwt-decode";
import { CgMenuRight, CgClose } from "react-icons/cg";

function Navbar() {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const token = localStorage.getItem("token");
  const setUserCourses = useSetRecoilState(userCourseAtom);
  const [menu, setMenu] = useState(false);

  const init = async () => {
    const response = await axios.get(
      "https://skill-lynx-server.vercel.app/users/me",
      {
        headers: {
          authorization: token,
        },
      }
    );
    setUser(response.data);
  };

  useEffect(() => {
    if (token) {
      if (jwt_decode(token).role === "user") {
        init();
      }
    }
  }, []);
  return (
    <>
      <header className="py-6 bg-fade-pink border-royal-green-600">
        <nav className="container flex justify-between items-center mx-auto px-8">
          <Link className="text-5xl" to="/">
            <strong className="text-gold-900">Course</strong>
            <strong className="text-royal-green-900"> X</strong>
          </Link>
          <button onClick={() => setMenu(!menu)} className="md:hidden">
            <CgMenuRight className="text-2xl text-gold-900" />
          </button>

          <ul
            className={`absolute  md:static md:flex items-center ${
              menu
                ? "bg-royal-green-900 w-1/2 right-0 z-10 h-auto top-0 py-16 pl-8"
                : "hidden "
            }`}
          >
            <li className="absolute top-8 right-8 md:hidden">
              <button onClick={() => setMenu(!menu)}>
                <CgClose className="text-2xl text-gold-900" />
              </button>
            </li>
            <li>
              <Link
                className="text-md text-white md:text-royal-green-900 hover:text-gold-900"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="md:ml-6 mt-3 md:mt-0">
              <Link
                className="text-md text-white md:text-royal-green-900  hover:text-gold-900"
                to="/courses"
              >
                Courses
              </Link>
            </li>
            {user ? (
              <>
                <li className="md:ml-6 mt-3 md:mt-0">
                  <Link
                    className="text-md text-white md:text-royal-green-900  hover:text-gold-900"
                    to="/login"
                  >
                    {user}
                  </Link>
                </li>
                <li className="md:ml-6 mt-3 md:mt-0">
                  <button
                    className="text-md  border px-4 py-3 hover:bg-gold-900 hover:text-white rounded-full border-gold-900 text-gold-900"
                    onClick={() => {
                      localStorage.removeItem("token");
                      setUser("");
                      setUserCourses([]);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="md:ml-6 mt-3 md:mt-0">
                  <Link
                    className="text-md text-white md:text-royal-green-900  hover:text-gold-900"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="md:ml-6 mt-3 md:mt-0">
                  <Link
                    className="text-md inline-block  border px-4 py-3 hover:bg-gold-900 hover:text-white rounded-full border-gold-900 text-gold-900"
                    to="/signup"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
