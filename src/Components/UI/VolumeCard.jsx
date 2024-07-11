import PropTypes from "prop-types";
import DownloadButton from "./DownloadButton";
import AppUse from "../../Hooks/AppUse";

const VolumeCard = ({ vol, disponibilidad, downloand }) => {
  const { quitarDark } = AppUse();
  const bgColor = quitarDark ? "bg-gray-800" : "bg-[#e9eaed]";
  const textColorPrimary = quitarDark ? "text-white" : "text-gray-900";
  const textColorSecondary = quitarDark ? "text-gray-400" : "text-gray-700";
  return (
    <div
      className={`${bgColor} ${textColorPrimary} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300`}
    >
      <img
        src={vol.portadaVolumen}
        alt={`Volumen ${vol.volumen}`}
        className="w-64 object-contain"
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-2">Volumen {vol.volumen}</h2>
        <p className={`mb-4 ${textColorSecondary}`}>{disponibilidad}</p>
        {downloand.length > 0 &&
          downloand.map((link, i) => (
            <DownloadButton key={i} link={link} label="Descargar" />
          ))}
      </div>
    </div>
  );
};

VolumeCard.propTypes = {
  vol: PropTypes.object.isRequired,
  disponibilidad: PropTypes.string.isRequired,
  downloand: PropTypes.array.isRequired,
};

export default VolumeCard;
