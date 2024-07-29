import PropTypes from "prop-types";

const Personajes = ({ personajes }) => {
  let personajesNovel = [];

  try {
    const parsedPersonajes = JSON.parse(personajes);
    if (parsedPersonajes.length > 10) {
      personajesNovel = parsedPersonajes;
    }
  } catch (e) {
    return null;
  }

  if (personajesNovel.length === 0) {
    return null;
  }

  return (
    <section className=" w-11/12 margin pt-3 flex justify-evenly items-center flex-wrap">
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
    </section>
  );
};

Personajes.propTypes = {
  personajes: PropTypes.string.isRequired,
};

export default Personajes;
