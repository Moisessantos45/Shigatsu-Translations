import bg from "../img/5.jpg";
import PropTypes from "prop-types";

const Personajes = ({ personajes }) => {
  // console.log(personajes);
  return (
    <section className=" w-11/12 margin pt-3 flex justify-evenly flex-wrap">
      {personajes.length > 0 ? (
        <>
          {personajes.map((item, i) => (
            <figure
              key={i}
              className=" p-1 w-64 text-center flex flex-col items-center"
            >
              <img
                src={bg}
                alt=""
                className=" w-7/12 outline-3 h-28 outline-pink-600 outline rounded-md hover:outline hover:outline-pink-600 self-center"
              />
              <h1 className=" font-bold">{item.nombre}</h1>
              <p>{item.descripcion}</p>
            </figure>
          ))}
        </>
      ) : (
        ""
      )}
    </section>
  );
};

Personajes.propTypes = {
  personajes: PropTypes.arrayOf(PropTypes.object),
};

export default Personajes;
