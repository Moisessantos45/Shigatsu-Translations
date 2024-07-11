import PropTypes from "prop-types";
import AppUse from "../../Hooks/AppUse";

const HeaderSection = ({ title }) => {
  const { quitarDark } = AppUse();
  const activeTextColor = quitarDark ? "text-[#ffffff]" : "text-[#000000]";
  return (
    <div className="w-full text-center mb-8">
      <span className="block h-1 w-full bg-blue-500 rounded-md mb-4"></span>
      <h1 className={`text-4xl uppercase font-bold ${activeTextColor}`}>
        {title}
      </h1>
      <span className="block h-1 w-full bg-blue-500 rounded-md mt-4"></span>
    </div>
  );
};

HeaderSection.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderSection;
