import { useEffect, useState } from "react";
import { HiDesktopComputer } from "react-icons/hi";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";
import { PiSuitcaseSimpleFill, PiCertificateBold } from "react-icons/pi";
import axios from "axios";
import Course from "../common/CourseCard";
import { Link } from "react-router-dom";
import { USER_COURSE_URL } from "../utils/constant";

function Home() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(USER_COURSE_URL)
      .then((res) => setCourses(res.data.courses))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <section className="py-20 md:py-0 md:pt-32 md:overflow-hidden bg-fade-pink relative">
        <div className="bg-gold-900 h-64 w-64 rounded-full absolute -left-44 top-0 z-10"></div>
        <article className="container ml-auto md:h-[calc(100vh-133px)] md:grid grid-cols-2 gap-64 overflow-hidden px-8 relative z-20">
          <div>
            <h1 className="text-4xl md:text-5xl text-royal-green-900 font-extrabold leading-normal">
              Grow Your Skills, <br />
              Define Your Future
            </h1>
            <p className="text-lg text-royal-green-600 mt-6">
              Explore a world of opportunities and discover how continuous
              personal and professional development can pave the way for a
              successful and fulfilling journey ahead.
            </p>
            <Link
              to="/courses"
              className="bg-gold-900 text-white px-6 mt-14 py-3 text-lg inline-block rounded-full"
            >
              Explore Courses
            </Link>
            <footer className="mt-16 md:mt-28 flex justify-between">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-royal-green-900">
                  40k+
                </h2>
                <p className="text-lg md:text-xl text-royal-green-600 mt-3">
                  Happy students
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-royal-green-900">
                  12k+
                </h2>
                <p className="text-lg md:text-xl text-royal-green-600 mt-3">
                  Active Users
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-semibold text-royal-green-900">
                  2k+
                </h2>
                <p className="text-lg md:text-xl text-royal-green-600 mt-3">
                  Online Classes
                </p>
              </div>
            </footer>
          </div>
          <div className="hidden md:block bg-royal-green-900 h-full rounded-tl-3xl relative">
            <img
              src="/cover.jpg"
              className="relative top-16 -left-16 z-10 rounded-tl-3xl"
              alt=""
            />
            <div className="bg-gold-900 h-64 w-64 rounded-full absolute -right-8 -bottom-28"></div>
          </div>
        </article>
      </section>
      <section>
        <div className="container mx-auto py-32 px-8">
          <header>
            <h2 className="text-center text-4xl font-bold text-royal-green-900">
              Achive Your Goals With CourseX
            </h2>
            <p className="text-xl text-royal-green-600 text-center max-w-3xl mx-auto mt-8">
              Unlock your full potential through CourseX's diverse courses and
              expert guidance. Success awaits you!
            </p>
          </header>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-12">
            <article className="bg-white border-2 border-royal-green-300 p-8 rounded-xl">
              <div className="p-3 bg-royal-green-300 inline-block rounded">
                <HiDesktopComputer className="text-xl text-royal-green-700" />
              </div>

              <h3 className="text-2xl font-semibold text-royal-green-900 mt-4">
                Learn the latest skills
              </h3>
              <p className="text-base mt-4 text-royal-green-600">
                Stay ahead with CourseX: Learn and master the latest in-demand
                skills for a successful future.
              </p>
            </article>
            <article className="bg-[#F6FBF9] shadow-lg border-2 border-royal-green-300 p-8 rounded-xl">
              <div className="p-3 bg-gold-300 inline-block rounded">
                <PiSuitcaseSimpleFill className="text-xl text-gold-900" />
              </div>
              <h3 className="text-2xl font-semibold text-royal-green-900 mt-4">
                Get ready for a career
              </h3>
              <p className="text-base mt-4 text-royal-green-600">
                CourseX: Empowering your path to a rewarding career through
                expert guidance and courses.
              </p>
            </article>
            <article className="bg-white border-2 border-royal-green-300 p-8 rounded-xl">
              <div className="p-3 bg-royal-green-300 inline-block rounded">
                <PiCertificateBold className="text-xl text-royal-green-700" />
              </div>
              <h3 className="text-2xl font-semibold text-royal-green-900 mt-4">
                Earn a certificate
              </h3>
              <p className="text-base mt-4 text-royal-green-600">
                CourseX: Gain recognition with certified courses for better
                career opportunities.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto px-8">
          <header>
            <h2 className="text-center text-4xl font-bold text-royal-green-900">
              Our Popular Courses
            </h2>
          </header>
          {courses.length !== 0 ? (
            <div className="mt-8 grid md:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Course key={course._id} course={course} type={"user"} />
              ))}
            </div>
          ) : (
            <h2 className="text-xl font-bold text-gold-900 text-center mt-8">
              No course listed
            </h2>
          )}
          <div className="text-center">
            <Link
              to="/courses"
              className="bg-gold-900 text-white px-6 mt-14 py-3 text-lg inline-block rounded-full"
            >
              Explore More
            </Link>
          </div>
        </div>
      </section>
      <section className="py-32 px-8">
        <div className="container bg-[#323232] mx-auto max-w-4xl px-6 md:px-24 py-16 text-center rounded-2xl">
          <h2 className="text-white text-4xl font-semibold">
            Are you ready for today's course?
          </h2>
          <p className="text-white text-lg mt-6">
            Get ready to embark on an enriching learning journey. Today's course
            awaits, empowering your knowledge and skills.
          </p>
          <input
            className="border-b bg-transparent w-full max-w-sm mt-8 text-white py-2 outline-0"
            type="email"
            placeholder="Enter your email"
          />
          <br />
          <input
            className="bg-gold-900 rounded-full cursor-pointer w-full max-w-sm mt-8 text-white py-3 outline-0"
            type="submit"
            placeholder="Enter your email"
          />
        </div>
      </section>
      <footer className="pb-12">
        <div className="container mx-auto">
          <div className="md:flex items-center">
            <div className="text-2xl text-center md:text-left" to="/">
              <strong className="text-gold-900">Course</strong>
              <strong className="text-royal-green-900"> X</strong>
            </div>
            <nav className="md:ml-20 mt-6 md:mt-0">
              <ul className="flex justify-center items-center">
                <li>
                  <Link
                    className="text-md text-royal-green-900 hover:text-gold-900"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    Course
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    Service
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-8">
            <nav className="text-center md:text-right">
              <ul className="inline-flex items-center justify-center md:justify-end md:border-b-2 pb-4 md:pr-24 border-gold-900">
                <li>
                  <Link
                    className="text-md text-royal-green-900 hover:text-gold-900"
                    to="/"
                  >
                    <FaFacebookSquare className="text-4xl text-gold-900" />
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    <FaLinkedin className="text-4xl text-gold-900" />
                  </Link>
                </li>
                <li className="ml-6">
                  <Link
                    className="text-md text-royal-green-900  hover:text-gold-900"
                    to="/course"
                  >
                    <FaInstagramSquare className="text-4xl text-gold-900" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
      <div className="bg-gray-800">
        <div className="container mx-auto py-4 px-8 text-white text-center">
          Made by Yash Raj Singh with ❤️
        </div>
      </div>
    </>
  );
}

export default Home;
