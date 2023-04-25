import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Post from "./pages/Post";
import AddEdit from "./pages/AddEdit";
import NotFound from "./pages/NotFound";

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
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "/:postId", element: <Post /> },
      {
        path: "/add",
        element: <AddEdit />,
      },
      { path: "/update/:postId", element: <AddEdit /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
