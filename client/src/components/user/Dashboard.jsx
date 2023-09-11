import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import CourseCard from "../../common/CourseCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userCourseAtom } from "../../store/atom";
import jwt_decode from "jwt-decode";
import { USER_PURCHASED_URL } from "../../utils/constant";

function Dashboard() {
  const token = localStorage.getItem("token");
  const userCourses = useRecoilValue(userCourseAtom);
  const setUserCourses = useSetRecoilState(userCourseAtom);
  useEffect(() => {
    if (token) {
      if (jwt_decode(token).role === "user") {
        axios
          .get(USER_PURCHASED_URL, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => {
            setUserCourses(res.data.purchasedCourses);
          })
          .catch((err) => console.error(err));
      }
    }
  }, []);
  return (
    <section className="container mx-auto px-6 py-12">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-royal-green-900">
          All Courses bought by you
        </h1>
        <Link to="/courses" className="btn btn-filled">
          Expore more Course
        </Link>
      </header>
      {userCourses.length === 0 ? (
        <h1 className="text-xl font-bold text-gold-900 mt-24 text-center">
          You haven't bought any course yet
        </h1>
      ) : (
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {userCourses.map((course) => (
            <CourseCard key={course._id} course={course} type={"user"} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Dashboard;
