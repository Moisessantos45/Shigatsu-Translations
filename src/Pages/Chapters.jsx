import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import "../css/styleChapter.css";
import AppUse from "../Hooks/AppUse";
import { formatearTextoConImagenes } from "../Components/FormatChapter";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Chapters = () => {
  const { setTitle, setHeigth, setBgHeader, setHidden } = AppUse();
  const [loader, setLoader] = useState(true);
  const [cont, setCont] = useState(0);
  const params = useParams();
  const { path, clave, chapter } = params;
  const query = useQuery();
  const volumen = query.get("volumen");
  const url =
    path !== "chapterText"
      ? `/${clave}/${chapter}.txt`
      : `/jsons/${clave}_${volumen}/${chapter}.txt`;
  console.log(url);
  let texto = useRef("");

  useEffect(() => {
    const fecthData = async () => {
      try {
        console.log(url);
        const { data } = await axios(url);
        const title = data.split(/\n\s*\n/)[0];
        texto.current = data.split(/\n\s*\n/)[1];

        setTitle(title);
        setBgHeader("");
        setHeigth(true);
        setHidden(true);
      } catch (error) {
        setTitle("No hay capitulo");
      } finally {
        setLoader(false);
      }
    };
    fecthData();
  }, [chapter]);

  useEffect(() => {
    const fecthFiles = async () => {
      try {
        const urlNexT = url.split("/").slice(0, -1).join("/");
        await axios(`${urlNexT}/${+chapter + 1}.txt`);
        setCont(+chapter + 1);
      } catch (error) {
        setCont(+chapter);
      } finally {
        setLoader(false);
      }
    };
    fecthFiles();
  }, [chapter]);

  if (loader) return <Loading />;

  const contenidoFormateado = formatearTextoConImagenes(texto.current);
  // console.log(contenidoFormateado);
  return (
    <section className="container_capi">
      {contenidoFormateado.length > 0 ? (
        <>
          {contenidoFormateado}
          <span className="h-1 w-full flex justify-center items-center rounded-md color_line"></span>
          <div className="naveg">
            {chapter > 1 && (
              <Link
                className="previuos cursor-pointer text-black btn"
                to={`/leer/webnovel/${path}/${clave}/${
                  +chapter - 1
                }?volumen=${volumen}`}
              >
                <img src="https://i.ibb.co/LS3B5Ky/previuos.webp" alt="" />
              </Link>
            )}
            <div className="home">
              <Link
                to={`/novela/${clave}/${encodeURIComponent(
                  "It Seems I Was Hitting on the Most Beautiful Girl in School"
                )}`}
                className="home__url btn"
              >
                <img src="https://i.ibb.co/hgYVmk4/home.webp" alt="" />
              </Link>
            </div>
            {chapter < cont ? (
              <Link
                className="next cursor-pointer text-black btn"
                to={`/leer/webnovel/${path}/${clave}/${
                  +chapter + 1
                }?volumen=${volumen}`}
              >
                <img src="https://i.ibb.co/jLxQJGZ/next.webp" alt="" />
              </Link>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        <h1 className=" text-center text-4xl m-2">No hay capitulo</h1>
      )}
    </section>
  );
};

export default Chapters;
