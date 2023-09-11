import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ROOT_URL } from "../../utils/constant";
import { adminAtom, adminCourseAtom, adminToken } from "../../store/atom";
import jwt_decode from "jwt-decode";

function Navbar() {
  const token = localStorage.getItem("token");
  const admin = useRecoilValue(adminAtom);
  const setAdmin = useSetRecoilState(adminAtom);
  const setAdminCourse = useSetRecoilState(adminCourseAtom);
  const setAdminToken = useSetRecoilState(adminToken);
  useEffect(() => {
    if (token) {
      if (jwt_decode(token).role === "admin") {
        axios
          .get(`${ROOT_URL}admin/me`, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => setAdmin(res.data))
          .catch((err) => console.error(err));
      }
    }
  }, []);
  return (
    <>
      <header className="py-6 border-b border-royal-green-600">
        <nav className="container mx-auto px-8">
          <div className="flex justify-between items-center">
            <Link className="text-5xl" to="/admin">
              <strong className="text-gold-900">Course</strong>
              <strong className="text-royal-green-900">X</strong>
            </Link>

            <ul className="flex justify-between items-center">
              {admin ? (
                <>
                  <li>
                    <button className="text-md text-royal-green-900 font-semibold">
                      {admin}
                    </button>
                  </li>
                  <li className="ml-4">
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        setAdmin("");
                        setAdminCourse([]);
                        setAdminToken("");
                      }}
                      className="text-md text-royal-green-900 font-semibold"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="text-md text-royal-green-900 font-semibold"
                      to="/admin/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="ml-4">
                    <Link
                      className="text-md text-royal-green-900 font-semibold"
                      to="/admin/signup"
                    >
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
