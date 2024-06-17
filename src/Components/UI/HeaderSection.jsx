import PropTypes from "prop-types";

const HeaderSection = ({ title }) => {
  return (
    <div className="w-full text-center mb-8">
      <span className="block h-1 w-full bg-blue-500 rounded-md mb-4"></span>
      <h1 className="text-4xl uppercase font-bold text-white">{title}</h1>
      <span className="block h-1 w-full bg-blue-500 rounded-md mt-4"></span>
    </div>
  );
};

HeaderSection.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderSection;
