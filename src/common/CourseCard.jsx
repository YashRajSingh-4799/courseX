import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atom";

function CourseCard({ course, type }) {
  return (
    <Link
      to={
        type === "user"
          ? `/user/courses/${course._id}`
          : `/admin/courses/${course._id}`
      }
    >
      <article className="border border-royal-green-600 rounded-md h-full">
        <header
          className="px-6 py-16 rounded-t-md bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${course.imgLink})`,
          }}
        >
          <h2 className="text-2xl text-white font-semibold text-center">
            {course.title}
          </h2>
        </header>
        <div className="p-6">
          <div className="flex justify-between items-center">
            <strong className="text-gold-900 font-semibold">
              ₹{course.price}
            </strong>
            <strong className="text-royal-green-600 font-normal text-sm">
              {course.tag}
            </strong>
          </div>

          <p className="mt-4 text-royal-green-900 text-base">
            {course.description}
          </p>
          {type !== "user" ? (
            <footer className="mt-4 flex justify-between items-center">
              {course.published ? (
                <span className="bg-royal-green-900 text-white text-xs p-2 rounded">
                  Published
                </span>
              ) : (
                <span className="bg-royal-green-600 text-white text-xs p-2 rounded">
                  Not Published
                </span>
              )}
            </footer>
          ) : (
            ""
          )}
        </div>
      </article>
    </Link>
  );
}

export default CourseCard;
