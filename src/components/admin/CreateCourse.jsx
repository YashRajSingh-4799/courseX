import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useRecoilValue } from "recoil";
import { adminToken } from "../../store/atom";
import { ADMIN_COURSES_URL } from "../../utils/constant";

function Courses() {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState(0);
  const [imgLink, setImgLink] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [message, setMessage] = useState("");
  const token = useRecoilValue(adminToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, tag, price, imgLink, description, published };
    const response = await axios.post(ADMIN_COURSES_URL, data, {
      headers: {
        authorization: token,
      },
    });

    setMessage(response.data.message);
    setTitle("");
    setTag("");
    setPrice("");
    setDescription("");
    setImgLink("");
    setPublished(false);
  };

  return (
    <section className="py-14 bg-fade-pink h-screen px-6">
      {token && jwt_decode(token).role === "admin" ? (
        <>
          <h1 className="text-center text-royal-green-900 font-bold text-xl">
            Create Course
          </h1>
          {message ? (
            <div className="text-center mt-4">
              <span className="text-lg text-gold-900">{message}</span>
              <br />
              <Link className="text-lg text-gold-900" to="/admin/dashboard">
                Go to your dashboard
              </Link>
            </div>
          ) : (
            ""
          )}
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="mt-12 max-w-md mx-auto w-full"
            action=""
          >
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              type="text"
              placeholder="Enter Image Link"
              value={imgLink}
              onChange={(e) => setImgLink(e.target.value)}
            />
            <textarea
              className="block w-full border border-royal-green-600 py-3 px-6 rounded my-4 text-royal-green-600 text-md"
              rows="4"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label className="text-royal-green-600" htmlFor="publish">
              <input
                id="publish"
                checked={published}
                onChange={(e) => setPublished(!published)}
                type="checkbox"
              />
              <span className="ml-2">Published</span>
            </label>
            <div className="text-center mt-4">
              <button
                onClick={(e) => handleSubmit(e)}
                className="px-6 py-3 text-md bg-royal-green-900 text-white rounded w-full"
              >
                Create
              </button>
            </div>
          </form>
        </>
      ) : (
        <div>
          <h1 className="text-xl font-bold text-royal-green-900 text-center py-12">
            You are not authenticated. <br /> To create course Please{" "}
            <Link className="text-gold-900" to={"/admin/login"}>
              login
            </Link>{" "}
          </h1>
        </div>
      )}
    </section>
  );
}

export default Courses;
