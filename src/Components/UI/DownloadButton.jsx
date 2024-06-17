import PropTypes from "prop-types";

const DownloadButton = ({ link, label }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-10/12 mx-auto mb-2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
    >
      {label}
    </a>
  );
};

DownloadButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DownloadButton;
