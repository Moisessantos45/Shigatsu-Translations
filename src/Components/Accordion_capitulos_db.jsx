import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
// import AppUse from "../Hooks/AppUse";
import { collection, getDocs } from "firebase/firestore/lite";
import dbFirebase from "../Config/firebase";
import { fromToJsonMapChapter } from "../Services/useServices";
import "../css/AccordionCapitulosDb.css";

const AccordionCapitulosDb = () => {
  // const { quitarDark } = AppUse();
  const [expanded, setExpanded] = useState(null);
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

  const handleChange = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  const grupoChapters = [];
  for (let i = 0; i < gruposDeCapitulos.length; i += 10) {
    grupoChapters.push(gruposDeCapitulos.slice(i, i + 10));
  }

  if (loading) return <Loading />;

  return (
    <div className="accordion-container">
      {grupoChapters.length > 0 && (
        <>
          <div className="accordion-title-container">
            <h1 className="accordion-title">
              Capítulos Disponibles Light Novel
            </h1>
          </div>
          {grupoChapters.map((grupo, i) => (
            <div
              key={i}
              className={`accordion-item ${expanded === i ? "open" : ""}`}
            >
              <button
                className="accordion-header"
                onClick={() => handleChange(i)}
              >
                <span>{`Capítulos ${i * 10 + 1}-${i * 10 + 10}`}</span>
                <svg
                  className={`accordion-icon ${expanded === i ? "rotate" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`accordion-content ${expanded === i ? "open" : ""}`}
              >
                {grupo.map((char, j) => (
                  <Link
                    key={j}
                    to={`/leer/${char.novelId}/${char.volumenPertenece}/${
                      char.capitulo
                    }?nombre=${encodeURIComponent(char.nombreNovela)}`}
                    className="accordion-link"
                  >
                    Volumen {char.volumenPertenece} - capítulo {char.capitulo}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AccordionCapitulosDb;
