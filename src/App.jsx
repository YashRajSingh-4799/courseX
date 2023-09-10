import Home from "./pages/Home";
import AdminSingleCourse from "./components/admin/SingleCourse";
import CreateCourse from "./components/admin/CreateCourse";
import AdminDashboard from "./components/admin/Dashboard";
import AdminLogin from "./components/admin/Login";
import AdminNavbar from "./components/admin/Navbar";
import AdminSignup from "./components/admin/Signup";
import Navbar from "./components/user/Navbar";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import Dashboard from "./components/user/Dashboard";
import SingleCourse from "./components/user/SingleCourse";
import Courses from "./components/user/Courses";
import EditCourse from "./components/admin/EditCourse";
import Admin from "./components/admin/Admin";
import { RecoilRoot } from "recoil";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/:user/dashboard" element={<Dashboard />} />
          <Route path="/user/courses/:id" element={<SingleCourse />} />
        </Route>

        <Route path="/admin" element={<AdminNavbar />}>
          <Route index element={<Admin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses/create" element={<CreateCourse />} />
          <Route path="/admin/courses/:id" element={<AdminSingleCourse />} />
          <Route path="/admin/courses/:id/edit" element={<EditCourse />} />
        </Route>
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Route>
    )
  );
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
      <Outlet />
    </>
  );
}

export default App;
