import { createBrowserRouter } from "react-router-dom";
import LayoutHome from "./Layouts/LayoutHome";
import Cards from "./Home/Cards";
import { lazy } from "react";
import Mantenimiento from "./Pages/Mantenimiento";

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
        path: "novela/:id",
        element: <PageNovel />,
      },
      {
        path: "leer/:clave/:vol/:capitulo",
        element: <Chapter />,
      },
      {
        path: "leer/webnovel/:path/:clave/:chapter",
        element: <Chapters />,
      },
    ],
  },
  {
    path: "*",
    element: <Mantenimiento />,
  },
]);

export default App;
