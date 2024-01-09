import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const AcordionCapitulos = () => {
  let array = Array.from({ length: 83 }, (_, i) => i + 1);
  // console.log(array);
  const params = useParams();
  const { name } = params;

  const capitulosArray = array;
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const gruposDeCapitulos = [];
  for (let i = 0; i < capitulosArray.length; i += 10) {
    gruposDeCapitulos.push(capitulosArray.slice(i, i + 10));
  }
  return (
    <div className=" w-10/12 flex flex-col margin">
      {gruposDeCapitulos.length > 0 ? (
        <>
          <div className="w-full flex justify-center m-2">
            <h1 className=" text-xl font-bold">
              Capitulos Disponibles &quot;Web Novel&quot;
            </h1>
          </div>
          {gruposDeCapitulos.map((grupo, i) => (
            <Accordion
              key={i}
              sx={{
                backgroundColor: "#3b3364",
                "&:active": { borderRadius: "0 0 10px 10px" },
                margin: "5px",
              }}
              expanded={expanded === `panel${i}`}
              onChange={handleChange(`panel${i}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  sx={{ width: "85%", flexShrink: 0, color: "white" }}
                >
                  {`Capitulos ${i * 10 + 1}-${i * 10 + 10}`}
                </Typography>
              </AccordionSummary>
              {grupo.map((char, i) => (
                <AccordionDetails
                  key={i}
                  sx={{
                    backgroundColor: "#2c2449",
                    borderRadius: "0 0 10px 10px",
                    margin: "5px auto",
                  }}
                >
                  <Typography>
                    <Link
                      to={`/leer/webnovel/${name}/${char}`}
                      className="flex items-center text-sm text-white w-10/12 h-5"
                    >
                      Capitulo {char}
                    </Link>
                  </Typography>
                </AccordionDetails>
              ))}
            </Accordion>
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default AcordionCapitulos;
