import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import HeaderSection from "./UI/HeaderSection";
import VolumeCard from "./UI/VolumeCard";

const Volumenes = () => {
  const [volumen, setVolumen] = useState([]);
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [downloand, setDownloand] = useState([]);
  const [loader, setLoader] = useState(true);
  const apiKey =
    "$2a$10$MIgcnZC4XKF." + "WREJQBQgq" + import.meta.env.VITE_API_KEY;

  const accesKey = "$2a$10$jMdAcKIvA40FjzM" + import.meta.env.VITE_ACCESS_KEY;

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
    <section className="w-11/12 mx-auto my-8 flex flex-wrap justify-evenly">
      {volumen.length > 0 ? (
        <>
          <HeaderSection title="Volúmenes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {volumen.map((vol, i) => (
              <VolumeCard
                key={vol.id}
                vol={vol}
                disponibilidad={disponibilidad[i]}
                downloand={downloand[i]}
                name={name}
              />
            ))}
          </div>
        </>
      ) : (
        <h1 className="text-4xl uppercase font-bold text-center text-white w-full">
          No hay volúmenes
        </h1>
      )}
    </section>
  );
};

export default Volumenes;
