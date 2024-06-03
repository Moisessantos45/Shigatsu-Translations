import { useParams } from "react-router-dom";
import Descripcion from "../Components/Descripcion";
import Gallery from "../Components/Gallery";
import Personajes from "../Components/Personajes";
import Volumenes from "../Components/Volumenes";
import { useEffect, useState } from "react";
import axios from "axios";
import AppUse from "../Hooks/AppUse";
import Loading from "../Components/Loading";
import AcordionCapitulos from "../Components/AcordionCapitulos";

const PageNovel = () => {
  const { setBgHeader, setTitle, setTitleText, setHeigth, setHidden } =
    AppUse();
  const [novela, setNovela] = useState([]);
  const [loader, setLoader] = useState(true);
  const apiKey =
    "$2a$10$MIgcnZC4XKF." + "WREJQBQgq" + import.meta.env.VITE_API_KEY;
  const accesKey = import.meta.env.VITE_ACCESS_KEY;
  const binId = "65987eb5dc746540188d80e8";
  const params = useParams();
  const { name } = params;
  //   console.log(name);
  useEffect(() => {
    const solicitud = async () => {
      try {
        const { data } = await axios(`https://api.jsonbin.io/v3/b/${binId}`, {
          headers: {
            "X-Master-Key": apiKey,
            "X-Access-Key": accesKey,
          },
        });
        // const { data } = await axios("/Content/data.json");
        const novel = Object.keys(data.record)
          .map((key) =>
            data.record[key].filter((item) => {
              return item.clave == name;
            })
          )
          .flat();
        setNovela(novel[0]);
        setBgHeader(novel[0].backgroud);
        setTitle(novel[0].titulo);
        setTitleText("");
        setHeigth(false);
        setHidden(false);
        setLoader(false);
      } catch (error) {
        return;
      }
    };
    solicitud();
  }, [name]);
  if (loader) return <Loading />;
  return (
    <>
      <Descripcion novela={novela} />
      <Personajes personajes={novela.personajes} />
      {name === "It_Seems_I_Was_Hitting" && <AcordionCapitulos />}
      <Gallery ilustraciones={novela.ilustraciones} />
      <Volumenes />
    </>
  );
};

export default PageNovel;
