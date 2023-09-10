import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ADMIN_COURSES_URL } from "../../utils/constant";

function SingleCourse() {
  const [course, setCourse] = useState({});
  const id = useParams().id;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(ADMIN_COURSES_URL, {
        headers: {
          authorization: token,
        },
      })
      .then((res) =>
        setCourse(res.data.courses.find((course) => course._id === id))
      )
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    navigate(`/admin/courses/${id}/edit`, { state: { course } });
  };

  return (
    <section>
      <header
        className="py-24 bg-cover bg-center bg-royal-green-600"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${course.imgLink})`,
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white text-royal-green-900s">
            {course.title}
          </h1>
          <div className="text-center">
            <strong className="text-royal-green-600 font-normal text-sm inline-block my-3">
              {course.tag}
            </strong>
            <br />
            <strong className="text-gold-900 font-semibold text-2xl inline-block">
              ₹{course.price}
            </strong>
          </div>
          <footer className="mt-4">
            {course.published ? (
              <span className="bg-royal-green-900 text-white text-xs p-2 rounded">
                Published
              </span>
            ) : (
              <span className="bg-royal-green-600 text-white text-xs p-2 rounded">
                Not Published
              </span>
            )}
            <br />
            <button
              onClick={handleClick}
              className="btn mt-4 !border-white !text-white inline-block"
            >
              Edit Course
            </button>
          </footer>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 mt-12">
        <p className=" text-royal-green-900 text-xl">{course.description}</p>
      </div>
    </section>
  );
}

export default SingleCourse;
