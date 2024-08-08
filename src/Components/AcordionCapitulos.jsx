import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useState } from "react";
import AppUse from "../Hooks/AppUse";

const AcordionCapitulos = ({ title, path, lengthContent, vol }) => {
  const { quitarDark } = AppUse();
  const [expanded, setExpanded] = useState(false);
  let array = Array.from({ length: lengthContent }, (_, i) => i + 1);
  const capitulosArray = array;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const gruposDeCapitulos = [];
  for (let i = 0; i < capitulosArray.length; i += 10) {
    gruposDeCapitulos.push(capitulosArray.slice(i, i + 10));
  }

  const bgColor = quitarDark ? "#2a2a38" : "#f0f0f5";
  const detailsBgColor = quitarDark ? "#3b3b4a" : "#e0e0eb";
  const textColor = quitarDark ? "text-white" : "text-gray-900";
  const summaryColor = quitarDark ? "white" : "black";

  return (
    <div className="w-10/12 flex flex-col margin mx-auto">
      {gruposDeCapitulos.length > 0 && (
        <>
          <div className="w-full flex justify-center m-2">
            <h1 className={`text-xl font-bold ${textColor}`}>
              {title}
              {/* Capitulos Disponibles &quot;Web Novel&quot; */}
            </h1>
          </div>
          {gruposDeCapitulos.map((grupo, i) => (
            <Accordion
              key={i}
              sx={{
                backgroundColor: bgColor,
                "&:active": { borderRadius: "0 0 10px 10px" },
                "&:hover": { backgroundColor: detailsBgColor },
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
                  }}
                >
                  <Typography>
                    <Link
                      to={`${path}/${char}?volumen=${vol}`}
                      // to={`/leer/webnovel/${id}/${char}`}
                      className={`flex items-center text-sm ${textColor} w-10/12 h-5 hover:underline hover:text-blue-500`}
                    >
                      {vol && `Volumen ${vol} -`} Capitulo {char}
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

AcordionCapitulos.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  vol: PropTypes.number,
  lengthContent: PropTypes.number.isRequired,
};

export default AcordionCapitulos;
