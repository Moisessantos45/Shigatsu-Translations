import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  const [nextChapter, setNextChapter] = useState(0);
  const params = useParams();
  const { path, clave, chapter } = params;
  const query = useQuery();
  const volumen = query.get("volumen");
  const url =
    path !== "chapterText"
      ? `/${clave}/${chapter}.txt`
      : `/jsons/${clave}_${volumen}/${chapter}.txt`;

  let texto = useRef("");

  const fetchChapter = async () => {
    try {
      const { data } = await axios(url);
      const [title, content] = data.split(/\n\s*\n/);

      setTitle(title);
      setBgHeader("");
      setHeigth(true);
      setHidden(true);
      texto.current = content;
      return content;
    } catch (error) {
      setTitle("No hay capítulo");
      return null;
    } finally {
      setLoader(false);
    }
  };

  const checkNextChapter = async () => {
    try {
      const nextChapterUrl = url.replace(
        `/${chapter}.txt`,
        `/${Number(chapter) + 1}.txt`
      );
      await axios(nextChapterUrl);
      setNextChapter(Number(chapter) + 1);
    } catch (error) {
      setNextChapter(Number(chapter));
    }
  };

  useEffect(() => {
    fetchChapter();
    checkNextChapter();
  }, [chapter]);
  if (loader) return <Loading />;

  const contenidoFormateado = formatearTextoConImagenes(texto.current);
  return (
    <>
      <Helmet>
        <title>{`Capítulo ${chapter} de ${clave} - Shigatsu Translation`}</title>
        <meta
          name="description"
          content={`Lee el capítulo ${chapter} de ${clave}. Disfruta de la traducción y conoce más sobre la novela.`}
        />
        <meta
          name="keywords"
          content={`novela, ${clave}, capítulo ${chapter}, traducción, Shigatsu Translation`}
        />
        <link
          rel="canonical"
          href={`https://shigatsu-translations.vercel.app/leer/webnovel/${path}/${clave}/${chapter}?volumen=${volumen}`}
        />
      </Helmet>

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
                  to={`/novela/${clave}/?nombre=${encodeURIComponent(
                    "It Seems I Was Hitting on the Most Beautiful Girl in School"
                  )}`}
                  className="home__url btn"
                >
                  <img src="https://i.ibb.co/hgYVmk4/home.webp" alt="" />
                </Link>
              </div>
              {chapter < nextChapter && (
                <Link
                  className="next cursor-pointer text-black btn"
                  to={`/leer/webnovel/${path}/${clave}/${
                    +chapter + 1
                  }?volumen=${volumen}`}
                >
                  <img src="https://i.ibb.co/jLxQJGZ/next.webp" alt="" />
                </Link>
              )}
            </div>
          </>
        ) : (
          <h1 className=" text-center text-4xl m-2">No hay capitulo</h1>
        )}
      </section>
    </>
  );
};

export default Chapters;
