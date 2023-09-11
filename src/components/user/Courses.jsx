import axios from "axios";
import Course from "../../common/CourseCard";
import { useEffect, useState } from "react";
import { USER_COURSE_URL } from "../../utils/constant";

function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(USER_COURSE_URL)
      .then((res) => setCourses(res.data.courses))
      .catch((err) => console.error(err));
  }, []);
  return (
    <section className="container mx-auto px-6 py-12">
      <header className="">
        <h1 className="text-3xl font-extrabold text-center text-royal-green-900">
          Popular Courses
        </h1>
      </header>

      {courses.length !== 0 ? (
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Course key={course._id} course={course} type={"user"} />
          ))}
        </div>
      ) : (
        <h2 className="text-3xl font-bold text-gold-900 text-center mt-32">
          No course listed
        </h2>
      )}
    </section>
  );
}

export default Courses;
