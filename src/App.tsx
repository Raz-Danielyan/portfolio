import { createBrowserRouter, RouterProvider } from "react-router";
import "./app.css";
import About from "./pages/about";
import Articles from "./pages/articles";
import ContactMe from "./pages/contact-me";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import Root from "./pages/root";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "articles", Component: Articles },
      { path: "contact-me", Component: ContactMe },
      { path: "*", Component: NotFound },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
