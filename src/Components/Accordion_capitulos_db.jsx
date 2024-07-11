import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import AppUse from "../Hooks/AppUse";
import { collection, getDocs } from "firebase/firestore/lite";
import dbFirebase from "../Config/firebase";
import { fromToJsonMapChapter } from "../Services/useServices";

const AccordionCapitulosDb = () => {
  const { quitarDark } = AppUse();
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gruposDeCapitulos, setGruposDeCapitulos] = useState([]);
  const params = useParams();
  const { id } = params;

  const name_collection = import.meta.env.VITE_COLLECTION_CHAPTERS;

  useEffect(() => {
    const getAllChapters = async () => {
      try {
        const chapterCol = collection(dbFirebase, name_collection);
        const chapterSnapshot = await getDocs(chapterCol);
        const chapterList = chapterSnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            capituloId: doc.id,
          }))
          .filter((item) => item.novelId === id);
        const fromToJson = chapterList.map(fromToJsonMapChapter);
        console.log(fromToJson);
        const shortChapters = fromToJson.sort((a, b) => {
          if (a.volumenPertenece === b.volumenPertenece) {
            return a.capitulo - b.capitulo;
          } else {
            return a.volumenPertenece - b.volumenPertenece;
          }
        });

        setGruposDeCapitulos(shortChapters);
      } catch (error) {
        setGruposDeCapitulos([]);
      } finally {
        setLoading(false);
      }
    };
    getAllChapters();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const grupoChapters = [];
  for (let i = 0; i < gruposDeCapitulos.length; i += 10) {
    grupoChapters.push(gruposDeCapitulos.slice(i, i + 10));
  }

  const bgColor = quitarDark ? "#3b3364" : "#f0f0f5";
  const detailsBgColor = quitarDark ? "#2c2449" : "#e0e0eb";
  const textColor = quitarDark ? "text-white" : "text-gray-900";
  const summaryColor = quitarDark ? "white" : "black";

  if (loading) return <Loading />;
  return (
    <div className="w-10/12 flex flex-col margin mx-auto">
      {grupoChapters.length > 0 && (
        <>
          <div className="w-full flex justify-center m-2">
            <h1 className={`text-xl font-bold ${textColor}`}>
              Capitulos Disponibles &quot;Ligth Novel&quot;
            </h1>
          </div>
          {grupoChapters.map((grupo, i) => (
            <Accordion
              key={i}
              sx={{
                backgroundColor: bgColor,
                "&:active": { borderRadius: "0 0 10px 10px" },
                margin: "5px",
              }}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className={textColor} />}
                aria-controls="panel1bh-content"
                id={`panel${i}bh-header`}
                sx={{ color: summaryColor }}
              >
                <Typography
                  sx={{ width: "85%", flexShrink: 0, color: summaryColor }}
                >
                  {`Capitulos ${i * 10 + 1}-${i * 10 + 10}`}
                </Typography>
              </AccordionSummary>
              {grupo.map((char, i) => (
                <AccordionDetails
                  key={i}
                  sx={{
                    backgroundColor: detailsBgColor,
                    borderRadius: "0 0 10px 10px",
                    margin: "5px auto",
                  }}
                >
                  <Typography>
                    <Link
                      to={`/leer/${char.novelId}/${char.volumenPertenece}/${char.capitulo}?nombre=${encodeURIComponent(char.nombreNovela)}`}
                      className={`flex items-center text-sm ${textColor} w-10/12 h-5`}
                    >
                      Volumen {char.volumenPertenece} - capitulo {char.capitulo}
                    </Link>
                  </Typography>
                </AccordionDetails>
              ))}
            </Accordion>
          ))}
        </>
      )}
    </div>
  );
};

export default AccordionCapitulosDb;
