import { createBrowserRouter } from "react-router-dom";
import LayoutHome from "./Layouts/LayoutHome";
import Cards from "./Home/Cards";
import { lazy } from "react";

const PageNovel = lazy(() => import("./Pages/PageNovel"));
const Chapter = lazy(() => import("./Pages/Chapter"));
const Chapters = lazy(() => import("./Pages/Chapters"));

const App = createBrowserRouter([
  {
    path: "/",
    element: <LayoutHome />,
    children: [
      {
        index: true,
        element: <Cards />,
      },
      {
        path: "novela/:name",
        element: <PageNovel />,
      },
      {
        path: "leer/:clave/:chapter",
        element: <Chapter />,
      },
      {
        path: "leer/webnovel/:clave/:chapter",
        element: <Chapters />,
      },
    ],
  },
]);

export default App;
