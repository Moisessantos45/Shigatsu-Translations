import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkButton = ({ url, label }) => {
  return (
    <Link
      className="block w-10/12 mx-auto mb-2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300"
      to={url}
    >
      {label}
    </Link>
  );
};

LinkButton.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default LinkButton;
