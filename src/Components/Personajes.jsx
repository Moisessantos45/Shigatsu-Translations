import PropTypes from "prop-types";

const Personajes = ({ personajes }) => {
  const personajesNovel = personajes.length > 10 ? JSON.parse(personajes) : [];

  return (
    <section className=" w-11/12 margin pt-3 flex justify-evenly items-center flex-wrap">
      {personajesNovel.length > 0 ? (
        <>
          {personajesNovel.map((item, i) => (
            <figure
              key={i}
              className=" p-1 w-64 text-center flex flex-col items-center"
            >
              <img
                src={item.imagenPersonaje}
                alt=""
                className=" w-7/12 outline-3 h-28 outline-pink-600 outline rounded-md hover:outline hover:outline-pink-600 self-center"
              />
              <h1 className=" font-bold">{item.namePersonaje}</h1>
              <p>{item.descripcionPersonaje}</p>
            </figure>
          ))}
        </>
      ) : (
        <span></span>
      )}
    </section>
  );
};

Personajes.propTypes = {
  personajes: PropTypes.string.isRequired,
};

export default Personajes;
