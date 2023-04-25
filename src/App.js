import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Post from "./pages/Post";
import AddEdit from "./pages/AddEdit";
import "./App.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/post/:postId", element: <Post /> },
      { path: "/add", element: <AddEdit /> },
      { path: "/update/:postId", element: <AddEdit /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
