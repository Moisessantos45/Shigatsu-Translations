import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import "../css/styleChapter.css";
import AppUse from "../Hooks/AppUse";
import { formatearTextoConImagenes } from "../Components/FormatChapter";
import { collection, getDocs } from "firebase/firestore/lite";
import dbFirebase from "../Config/firebase";
import { fromToJsonMapChapter } from "../Services/useServices";

const Chapter = () => {
  const { setTitle, setHeigth, setBgHeader, setHidden } = AppUse();
  const [dataContent, setData] = useState();
  const [loader, setLoader] = useState(true);
  const [cont, setCont] = useState(0);
  const params = useParams();
  const { clave, vol, capitulo } = params;
  let texto = useRef("");
  const name_collection = import.meta.env.VITE_COLLECTION_CHAPTERS;

  useEffect(() => {
    const fecthData = async () => {
      try {
        const novelCol = collection(dbFirebase, name_collection);
        const novelSnapshot = await getDocs(novelCol);

        const novelList = novelSnapshot.docs.map((doc) => ({
          ...doc.data(),
          capituloId: doc.id,
        }));
        console.log(novelList);
        setCont(
          novelList.filter(
            (item) => item.novelId === clave && item.volumenPertenece === +vol
          ).length
        );

        const chapterDoc = novelList.filter(
          (item) =>
            item.novelId === clave &&
            item.volumenPertenece === +vol &&
            item.capitulo === +capitulo
        );
        const fromToJson = fromToJsonMapChapter(chapterDoc[0]);
        setData(fromToJson);
        texto.current = fromToJson.contenido;
        setTitle(fromToJson.nombreCapitulo);
        setBgHeader("");
        setHeigth(true);
        setHidden(true);
      } catch (error) {
        setTitle("No hay capitulo");
        return;
      } finally {
        setLoader(false);
      }
    };
    fecthData();
  }, [capitulo]);

  if (loader) return <Loading />;

  const contenidoFormateado =
    texto.current.length > 0 ? (
      formatearTextoConImagenes(texto.current)
    ) : (
      <h1>No hay capitulo</h1>
    );

  return (
    <section className="container_capi">
      {contenidoFormateado.length > 0 ? (
        <>
          {contenidoFormateado}
          <span className="h-1 w-full flex justify-center items-center rounded-md color_line"></span>
          <div className="naveg">
            {+capitulo > 1 && (
              <Link
                className="previuos cursor-pointer text-black btn_dinamic btn"
                to={`/leer/${clave}/${vol}/${
                  +capitulo - 1
                }?nombre=${encodeURIComponent(dataContent.nombreNovela)}`}
              >
                <img
                  src="https://i.ibb.co/LS3B5Ky/previuos.webp"
                  alt="Previous"
                />
              </Link>
            )}
            <div className="home">
              <Link
                to={`/novela/${clave}/${encodeURIComponent(
                  dataContent.nombreNovela
                )}`}
                className="home__url btn"
              >
                <img src="https://i.ibb.co/hgYVmk4/home.webp" alt="Home" />
              </Link>
            </div>
            {+capitulo < cont && (
              <Link
                className="next cursor-pointer text-black btn_dinamic btn"
                to={`/leer/${clave}/${vol}/${
                  +capitulo + 1
                }?nombre=${encodeURIComponent(dataContent.nombreNovela)}`}
              >
                <img src="https://i.ibb.co/jLxQJGZ/next.webp" alt="Next" />
              </Link>
            )}
          </div>
        </>
      ) : (
        <h1 className="text-center text-4xl m-2">No hay capitulo</h1>
      )}
    </section>
  );
};

export default Chapter;
