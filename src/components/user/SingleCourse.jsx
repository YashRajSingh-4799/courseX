import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../store/atom";
import jwt_decode from "jwt-decode";
import { USER_COURSE_URL } from "../../utils/constant";

function SingleCourse() {
  const [course, setCourse] = useState({});
  const id = useParams().id;
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    axios
      .get(USER_COURSE_URL)
      .then((res) =>
        setCourse(res.data.courses.find((course) => course._id === id))
      )
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    if (token) {
      if (jwt_decode(token).role === "user") {
        axios
          .post(`${USER_COURSE_URL}/${id}`, null, {
            headers: {
              authorization: token,
            },
          })
          .then((res) => setMessage(res.data.message))
          .catch((err) => console.error(err));
      } else {
        setMessage("You are not authenticated to buy any course");
      }
    } else {
      setMessage("You are not authenticated to buy any course");
    }
  };

  return (
    <section>
      <header
        className="py-24 bg-cover bg-center"
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
          {message ? (
            <h2 className="text-xl font-bold text-gold-900 mt-4 text-center">
              {message}
              <br />
              {token ? (
                <>
                  {jwt_decode(token).role === "user" ? (
                    <Link to={`/${user}/dashboard`}>Go to your dashbaord</Link>
                  ) : (
                    <Link to={`/login`}>Please login to buy course</Link>
                  )}
                </>
              ) : (
                ""
              )}
            </h2>
          ) : (
            ""
          )}
          <footer className="mt-4">
            <button
              onClick={handleClick}
              className="btn mt-4 !border-white !text-white inline-block"
            >
              Buy Course
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
