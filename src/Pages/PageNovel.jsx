import { collection, getDocs } from "firebase/firestore/lite";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Descripcion from "../Components/Descripcion";
import Gallery from "../Components/Gallery";
import Personajes from "../Components/Personajes";
import Volumenes from "../Components/Volumenes";
import AccordionCapitulosDb from "../Components/Accordion_capitulos_db";
import AppUse from "../Hooks/AppUse";
import Loading from "../Components/Loading";
import AcordionCapitulos from "../Components/AcordionCapitulos";
import dbFirebase from "../Config/firebase";
import { fromToJsonMapNovel } from "../Services/useServices";

const PageNovel = () => {
  const { setBgHeader, setTitle, setTitleText, setHeigth, setHidden } =
    AppUse();
  const [novela, setNovela] = useState([]);
  const [loader, setLoader] = useState(true);
  const name_collection = import.meta.env.VITE_COLLECTION_NOVEL;

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const solicitud = async () => {
      try {
        const novelCol = collection(dbFirebase, name_collection);
        const novelSnapshot = await getDocs(novelCol);
        const novelList = novelSnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            idNovel: doc.id,
          }))
          .filter((item) => item.idNovel === id);
        const fromToJson = fromToJsonMapNovel(novelList[0]);
        setNovela(fromToJson);
        setBgHeader(fromToJson.background);
        setTitle(fromToJson.titleNovel);
        setTitleText("");
        setHeigth(false);
        setHidden(false);
        setLoader(false);
      } catch (error) {
        return;
      }
    };
    solicitud();
  }, [id]);

  if (loader) return <Loading />;
  return (
    <>
      <Descripcion novela={novela} />
      <Personajes personajes={novela.personajes} />
      {id === "iwAda49vXUdhaNzz2DXF" && (
        <>
          <AcordionCapitulos
            title='Capitulos Disponibles "Web Novel"'
            path={`/leer/webnovel/chapterJson/${id}`}
            lengthContent={83}
          />
          <AcordionCapitulos
            title='Capitulos Disponibles "Light Novel 1"'
            path={`/leer/webnovel/chapterText/${id}`}
            vol={1}
            lengthContent={7}
          />
          <AcordionCapitulos
            title='Capitulos Disponibles "Light Novel 2"'
            path={`/leer/webnovel/chapterText/${id}`}
            vol={2}
            lengthContent={8}
          />
          <AcordionCapitulos
            title='Capitulos Disponibles "Light Novel 3"'
            path={`/leer/webnovel/chapterText/${id}`}
            vol={3}
            lengthContent={7}
          />
        </>
      )}
      <AccordionCapitulosDb />
      <Gallery ilustraciones={novela.ilustracionesAtuales} />
      <Volumenes />
    </>
  );
};

export default PageNovel;
