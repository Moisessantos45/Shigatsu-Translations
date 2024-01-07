import PropTypes from "prop-types";

const Gallery = ({ ilustraciones }) => {
  // console.log(ilustraciones);

  const separarIlustraciones =
    ilustraciones.trim() ? ilustraciones.trim().split(",") : 0;
  // console.log(separarIlustraciones);
  return (
    <section className="w-11/12 flex justify-center items-center m-auto flex-col">
      {separarIlustraciones.length > 0 ? (
        <>
          <div className="h-32 m-auto mt-2 flex justify-evenly text-center flex-col w-12/12">
            <span className="line3 h-1 w-full flex justify-center items-center rounded-md color_line"></span>
            <h1 className="title text-4xl uppercase font-bold">
              Ilustraciones de la novela
            </h1>
            <span className="line3 h-1 w-full flex justify-center items-center rounded-md color_line"></span>
          </div>
          <figure className=" w-full gap-1 flex justify-around flex-wrap">
            {separarIlustraciones.map((item, i) => (
              <img
                key={i}
                src={item}
                alt=""
                className=" max-w-40 sm:max-w-72 object-contain m-2"
              />
            ))}
          </figure>
        </>
      ) : (
        ""
      )}
    </section>
  );
};

Gallery.propTypes = {
  ilustraciones: PropTypes.string.isRequired,
};

export default Gallery;
