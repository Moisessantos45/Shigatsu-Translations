import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

const Volumenes = () => {
  const [volumen, setVolumen] = useState([]);
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [downloand, setDownloand] = useState([]);
  const [loader, setLoader] = useState(true);
  const apiKey =
    "$2a$10$MIgcnZC4XKF." + "WREJQBQgq" + import.meta.env.VITE_API_KEY;

  const accesKey ="$2a$10$jMdAcKIvA40FjzM"+ import.meta.env.VITE_ACCESS_KEY;

  const binId = "665d22dde41b4d34e4fda62c";
  const params = useParams();
  const { name } = params;
  // console.log(name);
  useEffect(() => {
    const solicitud = async () => {
      try {
        const { data } = await axios(`https://api.jsonbin.io/v3/b/${binId}`, {
          headers: {
            "X-Master-Key": apiKey,
            "X-Access-Key": accesKey,
          },
        });
        // const { data } = await axios("/Content/volumenes.json");
        const novel = data.record[name] || [];
        setVolumen(novel);
        const filtro = novel.map((item) =>
          Object.values(item.disponibilidad).filter(
            (items) => items.trim() !== ""
          )
        );
        const descargar = novel
          .map((item) =>
            Object.keys(item.disponibilidad).filter(
              (items) => item.disponibilidad[items].trim() !== ""
            )
          )
          .flat();
        // console.log(descargar);
        setDisponibilidad(filtro);
        setDownloand(descargar);
      } catch (error) {
        setVolumen([]);
      } finally {
        setLoader(false);
      }
    };
    solicitud();
  }, [name]);
  if (loader) return <Loading />;

  return (
    <section className=" w-11/12 margin flex justify-evenly flex-wrap">
      {volumen.length > 0 ? (
        <>
          <div className="h-24 m-auto mt-2 flex justify-evenly text-center items-center flex-col w-12/12">
            <span className="line3 h-1 w-full flex justify-center items-center rounded-md color_line"></span>
            <h1 className="title text-4xl uppercase font-bold flex justify-center items-center">
              Volumenes
            </h1>
            <span className="line3 h-1 w-full flex justify-center items-center rounded-md color_line"></span>
          </div>
          {volumen.map((vol, i) => (
            <figure
              key={vol.id}
              className="flex flex-col items-center text-center m-2 w-64"
            >
              <img
                src={vol.imagen}
                alt=""
                className=" w-11/12 rounded-md box_shadow"
              />
              <div className="flex w-12/12 flex-col items-center justify-center text-center gap-2 m-2">
                <h1 className="flex justify-center items-center font-bold">
                  Volumen {vol.volumen}
                </h1>
                <p className=" text-center">{disponibilidad[i]}</p>
                {downloand[i] == "leer" ? (
                  <Link
                    className=" w-10/12 h-8 text-white flex justify-center items-center color_line rounded-xl cursor-pointer"
                    to={`/leer/${name}_${vol.volumen}/1`}
                  >
                    Leer
                  </Link>
                ) : (
                  ""
                )}
                {vol.link_mega && (
                  <a
                    href={`${vol.link_mega}`}
                    className=" w-10/12 h-8 text-white flex justify-center items-center color_line rounded-xl cursor-pointer"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar PDF Mega
                  </a>
                )}
                {vol.link_mediafire && (
                  <a
                    href={`${vol.link_mediafire}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" w-10/12 h-8 text-white flex justify-center items-center color_line rounded-xl cursor-pointer"
                  >
                    Descargar PDF Mediafire
                  </a>
                )}
                {vol.link_epub_mega && (
                  <a
                    href={`${vol.link_epub_mega}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" w-10/12 h-8 text-white flex justify-center items-center color_line rounded-xl cursor-pointer"
                  >
                    Descargar EPUB Mega
                  </a>
                )}
                {vol.link_epub_mediafire && (
                  <a
                    href={`${vol.link_epub_mediafire}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" w-10/12 h-8 text-white flex justify-center items-center color_line rounded-xl cursor-pointer"
                  >
                    Descargar EPUB Mediafire
                  </a>
                )}
              </div>
            </figure>
          ))}
        </>
      ) : (
        <h1 className="title text-4xl uppercase font-bold">No hay volumenes</h1>
      )}
    </section>
  );
};

export default Volumenes;
