import PropTypes from "prop-types";
import DownloadButton from "./DownloadButton";
import LinkButton from "./LinkButton";

const VolumeCard = ({ vol, disponibilidad, downloand, name }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={vol.imagen}
        alt={`Volumen ${vol.volumen}`}
        className="w-64 object-contain"
      />
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold mb-2">Volumen {vol.volumen}</h2>
        <p className="text-gray-400 mb-4">{disponibilidad}</p>
        {downloand === "leer" && (
          <LinkButton url={`/leer/${name}_${vol.volumen}/1`} label="Leer" />
        )}
        {vol.link_mega && (
          <DownloadButton link={vol.link_mega} label="Descargar PDF Mega" />
        )}
        {vol.link_mediafire && (
          <DownloadButton
            link={vol.link_mediafire}
            label="Descargar PDF Mediafire"
          />
        )}
        {vol.link_epub_mega && (
          <DownloadButton
            link={vol.link_epub_mega}
            label="Descargar EPUB Mega"
          />
        )}
        {vol.link_epub_mediafire && (
          <DownloadButton
            link={vol.link_epub_mediafire}
            label="Descargar EPUB Mediafire"
          />
        )}
      </div>
    </div>
  );
};

VolumeCard.propTypes = {
  vol: PropTypes.object.isRequired,
  disponibilidad: PropTypes.array.isRequired,
  downloand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default VolumeCard;
