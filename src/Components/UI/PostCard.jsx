import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PostCard = ({
  image,
  title,
  date,
  numberPost,
  novelId,
  nombreNovela,
}) => {
  return (
    <div className="flex lg:h-60 lg:flex-col bg-[#2b2b37] rounded-lg shadow-md overflow-hidden mx-2 my-4 w-full">
      <img
        className="lg:w-full lg:h-32 h-36 object-cover lg:object-top"
        src={image}
        alt={title}
      />
      <div className="p-4">
        <div className="flex items-center text-gray-400 text-sm mb-2">
          {/* <span className="material-icons mr-1">date</span> */}
          {date}
        </div>
        <Link
          to={`/novela/${novelId}?nombre=${encodeURIComponent(nombreNovela)}`}
          className={`${novelId === "" ? "cursor-not-allowed" : ""}`}
        >
          <h2 className="text-lg font-semibold text-white">
            {title.toLowerCase()} {numberPost}
          </h2>
        </Link>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  numberPost: PropTypes.number.isRequired,
  novelId: PropTypes.string.isRequired,
  nombreNovela: PropTypes.string.isRequired,
};

export default PostCard;
