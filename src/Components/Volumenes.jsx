import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import HeaderSection from "./UI/HeaderSection";
import VolumeCard from "./UI/VolumeCard";
import dbFirebase from "../Config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { fromToJsonMapVol } from "../Services/useServices";

const Volumenes = () => {
  const [volumen, setVolumen] = useState([]);
  const [loader, setLoader] = useState(true);
  const name_collection = import.meta.env.VITE_COLLECTION_VOL;
  const params = useParams();
  const { id } = params;
  // console.log(name);
  useEffect(() => {
    const solicitud = async () => {
      try {
        const volCol = collection(dbFirebase, name_collection);
        const volSnapshot = await getDocs(volCol);
        const volList = volSnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            volumenId: doc.id,
          }))
          .filter((item) => item.novelId === id);

        const fromToJson = volList.map(fromToJsonMapVol);
        setVolumen(fromToJson);
      } catch (error) {
        setVolumen([]);
      } finally {
        setLoader(false);
      }
    };
    solicitud();
  }, [id]);

  if (loader) return <Loading />;
  return (
    <section className="w-11/12 mx-auto my-8 flex flex-wrap justify-evenly">
      {volumen.length > 0 && (
        <>
          <HeaderSection title="Volúmenes" />
          <div
            className={`grid ${
              volumen.length < 4
                ? "md:grid-cols-3"
                : "md:grid-cols-4"
            } grid-cols-1 sm:grid-cols-2 gap-6`}
          >
            {volumen.map((vol) => (
              <VolumeCard
                key={vol.volumenId}
                vol={vol}
                disponibilidad={vol.disponibilidad}
                downloand={vol.links}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Volumenes;
