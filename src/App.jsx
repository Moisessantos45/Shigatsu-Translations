import { createBrowserRouter } from "react-router-dom";
import LayoutHome from "./Layouts/LayoutHome";
import Cards from "./Home/Cards";
import PageNovel from "./Pages/PageNovel";
import Chapter from "./Pages/Chapter";
import Chapters from "./Pages/Chapters";

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
