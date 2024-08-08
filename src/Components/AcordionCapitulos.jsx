import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import AppUse from "../Hooks/AppUse";
import "../css/AcordionCapitulos.css";

const AcordionCapitulos = ({ title, path, lengthContent, vol }) => {
  const { quitarDark } = AppUse();
  const [expanded, setExpanded] = useState(null);
  const array = Array.from({ length: lengthContent }, (_, i) => i + 1);
  const capitulosArray = array;

  const handleChange = (panel) => {
    setExpanded(expanded === panel ? null : panel);
  };

  const gruposDeCapitulos = [];
  for (let i = 0; i < capitulosArray.length; i += 10) {
    gruposDeCapitulos.push(capitulosArray.slice(i, i + 10));
  }


  const textColor = quitarDark ? "#94a3b8" : "#333";

  return (
    <div className="accordion-container" style={{ color: textColor }}>
      {gruposDeCapitulos.length > 0 && (
        <>
          <div className="accordion-title-container">
            <h1 className="accordion-title">{title}</h1>
          </div>
          {gruposDeCapitulos.map((grupo, i) => (
            <div
              key={i}
              className={`accordion-item ${expanded === i ? 'open' : ''}`}
            >
              <button
                className="accordion-header"
                onClick={() => handleChange(i)}
              >
                <span>{`Capítulos ${i * 10 + 1}-${i * 10 + 10}`}</span>
                <svg
                  className={`accordion-icon ${expanded === i ? 'rotate' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`accordion-content ${expanded === i ? 'open' : ''}`}>
                {grupo.map((char, j) => (
                  <Link
                    key={j}
                    to={`${path}/${char}?volumen=${vol}`}
                    className="accordion-link"
                  >
                    {vol && `Volumen ${vol} -`} Capítulo {char}
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

AcordionCapitulos.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  vol: PropTypes.number,
  lengthContent: PropTypes.number.isRequired,
};

export default AcordionCapitulos;
