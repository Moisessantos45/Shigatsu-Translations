import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Components/Loading";
import "../css/styleChapter.css";
import AppUse from "../Hooks/AppUse";

const unirSimbolos = (texto) => {
  const theme = document.documentElement.classList.contains("darkMode");
  const themeActive = theme ? "bg-zinc-700" : "bg-gray-300";
  const symbols = [
    "◊◊◊",
    "◊◊",
    "◊",
    "$$$",
    "$$",
    "$",
    "**",
    "*",
    "§§§",
    "◆ ◆ ◆",
    "☆",
    "☆☆",
    "☆☆☆",
    "++++++++",
    "++++++",
    "+++++++++",
    "+++++++",
    "+++++++++++++++++++++++++",
    "+++++",
  ];
  const notasTraductor = "-----";
  let result = [];
  let preBlock = "";
  let insideNote = false;

  for (let line of texto.split("\n")) {
    if (line.trim() === notasTraductor) {
      if (!insideNote) {
        insideNote = true;
        if (preBlock !== "") {
          result.push(
            <pre key={result.length} className="whitespace-pre-line">
              {preBlock}
            </pre>
          );
          preBlock = "";
        }
      } else {
        insideNote = false;
        result.push(
          <span
            key={result.length}
            className={`m-auto mt-2 mb-2 flex w-full p-1 ${themeActive} rounded-lg`}
          >
            {preBlock}
          </span>
        );
        preBlock = "";
      }
    } else if (insideNote) {
      preBlock += line + "\n";
    } else {
      let isSymbol = symbols.includes(line.trim());
      if (isSymbol) {
        if (preBlock !== "") {
          result.push(
            <pre key={result.length} className="whitespace-pre-line">
              {preBlock}
            </pre>
          );
          preBlock = "";
        }
        result.push(
          <span key={result.length} className="m-auto flex justify-center w-24">
            {line}
          </span>
        );
      } else {
        preBlock += line + "\n";
      }
    }
  }

  if (preBlock !== "") {
    result.push(
      <pre key={result.length} className="whitespace-pre-line">
        {preBlock}
      </pre>
    );
  }

  return result;
};

function formatearTextoConImagenes(texto) {
  // console.log(texto)
  if (texto.length < 0) return [];
  if (!new RegExp("https://i.ibb.co", "i").test(texto)) {
    return unirSimbolos(texto);
  }
  const fragmentos = texto.split("\nhttps://i.ibb.co");
  return fragmentos.flatMap((fragmento, i) => {
    if (i === 0) {
      return [unirSimbolos(fragmento)];
    } else {
      const indiceEspacio = fragmento.indexOf("\n");
      const url = `https://i.ibb.co${
        indiceEspacio !== -1 ? fragmento.slice(0, indiceEspacio) : fragmento
      }`;
      const resto = indiceEspacio !== -1 ? fragmento.slice(indiceEspacio) : "";
      return [
        <figure key={i}>
          <img src={url.trim()} alt="" />
        </figure>,
        unirSimbolos(resto),
      ];
    }
  });
}

const Chapter = () => {
  const { setTitle, setHeigth, setBgHeader, setHidden } = AppUse();
  const [dataContent, setData] = useState("");
  const [loader, setLoader] = useState(true);
  const [cont, setCont] = useState(0);
  const [name, setName] = useState("");
  const params = useParams();
  const { clave, chapter } = params;
  let texto = "";
  useEffect(() => {
    const fecthData = async () => {
      try {
        const { data } = await axios(`/jsons/${clave}/${chapter}.txt`);
        setData(data);
        const title = data
          .split(/\n\s*\n/)
          .filter((item, i) => i < 1)
          .join("\n");
        setTitle(title);
        setBgHeader("");
        setHeigth(true);
        setHidden(true);
      } catch (error) {
        setTitle("No hay capitulo");
        return;
      } finally {
        setLoader(false);
        const title = clave.split("_").slice(0, -1).join("_");
        setName(title);
      }
    };
    fecthData();
  }, [chapter]);

  useEffect(() => {
    const fecthFiles = async () => {
      try {
        await axios(`/jsons/${clave}/${+chapter + 1}.txt`);
        setCont(+chapter + 1);
      } catch (error) {
        setCont(+chapter);
        return;
      } finally {
        setLoader(false);
      }
    };
    fecthFiles();
  }, [chapter]);

  if (loader) return <Loading />;
  if (dataContent) {
    // console.log(dataContent);
    texto = dataContent
      .split(/\n\s*\n/)
      .filter((item, i) => i > 0)
      .join("\n");
  }
  const contenidoFormateado = formatearTextoConImagenes(texto);
  return (
    <section className="container_capi">
      {contenidoFormateado.length > 0 ? (
        <>
          {contenidoFormateado}
          <span className="h-1 w-full flex justify-center items-center rounded-md color_line"></span>
          <div className="naveg">
            {+chapter > 1 ? (
              <Link
                className="previuos cursor-pointer text-black btn_dinamic "
                to={`/leer/${clave}/${+chapter - 1}`}
              >
                <img src="https://i.ibb.co/LS3B5Ky/previuos.webp" alt="" />
              </Link>
            ) : (
              ""
            )}
            <div className="home">
              <Link to={`/novela/${name}`} className="home__url">
                <img src="https://i.ibb.co/hgYVmk4/home.webp" alt="" />
              </Link>
            </div>
            {+chapter < cont ? (
              <Link
                className="next cursor-pointer text-black btn_dinamic mostrar"
                to={`/leer/${clave}/${+chapter + 1}`}
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

export default Chapter;
