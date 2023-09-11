import { Link } from "react-router-dom";
import Course from "../../common/CourseCard";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { adminCourseAtom } from "../../store/atom";
import { ADMIN_COURSES_URL } from "../../utils/constant";

function Dashboard() {
  const token = localStorage.getItem("token");
  const adminCourses = useRecoilValue(adminCourseAtom);
  const setAdminCourses = useSetRecoilState(adminCourseAtom);
  useEffect(() => {
    if (token) {
      if (jwt_decode(token).role === "admin") {
        axios
          .get(ADMIN_COURSES_URL, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => setAdminCourses(res.data.courses))
          .catch((err) => console.error(err));
      }
    }
  }, []);
  return (
    <section className="container mx-auto px-6 py-12">
      {token ? (
        <>
          <header className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-royal-green-900">
              All Courses created by You
            </h1>
            <Link to="/admin/courses/create" className="btn btn-filled">
              Create Course
            </Link>
          </header>
          {adminCourses.length !== 0 ? (
            <div className="mt-8 grid md:grid-cols-3 gap-8">
              {adminCourses.map((course) => (
                <Course key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <h2 className="text-3xl font-bold text-gold-900 text-center mt-32">
              No course listed yet please create one
            </h2>
          )}
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold text-royal-green-900 text-center py-12">
            You are not authenticated. <br /> To see your dashboard Please{" "}
            <Link className="text-gold-900" to={"/admin/login"}>
              login
            </Link>{" "}
          </h1>
        </div>
      )}
    </section>
  );
}

export default Dashboard;
