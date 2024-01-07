import PropTypes from "prop-types";

const Descripcion = ({ novela }) => {
  // console.log(novela);
  const { imagen, autor, nombres, volumenes, Activo, sinopsis, generos } =
    novela;
  return (
    <>
      <section className="minfo w-11/12 m-auto flex justify-center items-center flex-col">
        <div className="minfo_title h-16 m-auto mt-2 flex justify-evenly text-center flex-col w-full">
          <span className="line3 h-1 w-full flex justify-center items-center rounded-md color_line"></span>
          <h1 className="title text-2xl uppercase font-bold">Informacion</h1>
          <span className="line3 h-1 w-full flex justify-center items-center rounded-md color_line"></span>
        </div>
        <figure className=" sm:w-3/12 w-8/12 p-2 m-auto mt-2 flex justify-center flex-col items-center">
          <img
            src={imagen}
            alt=""
            className=" rounded-lg shadow-md shadow-slate-200"
          />
          <div className="web flex justify-center items-center flex-col m-2">
            <h4 className=" font-bold uppercase">Novela ligera</h4>
            <p className="text-1">Novela en proceso</p>
          </div>
        </figure>
      </section>
      <section className="info w-11/12 m-auto justify-center flex p-2">
        <table className=" w-12/12 flex flex-col items-center gap-1">
          <caption className=" capitalize m-1">
            Informacion de la novelas
          </caption>
          <thead className=" flex items-center flex-col w-full gap-2">
            <tr className=" w-full flex p-1">
              <th className=" sm:w-2/12 w-5/12 flex">Nombres alternos:</th>
              <td className="ml-1 flex">{nombres}</td>
            </tr>
            <tr className=" w-full flex p-1">
              <th className=" sm:w-2/12 w-3/12 flex">Autor</th>
              <td className="ml-1">{autor}</td>
            </tr>
            <tr className=" w-full flex p-1">
              <th className=" sm:w-2/12 w-4/12 flex">Generos:</th>
              <td>{generos}</td>
            </tr>
            <tr className=" w-full flex p-1">
              <th className=" sm:w-2/12 w-4/12 flex">Volumenes:</th>
              <td className="ml-1">{volumenes}</td>
            </tr>
            <tr className=" w-full flex p-1">
              <th className=" sm:w-2/12 w-4/12 flex">activo:</th>
              <td>{Activo ? "si" : "no"}</td>
            </tr>
            <tr className=" w-full flex p-1">
              <th className=" w-full text-center" colSpan={2}>
                Sinopsis:
              </th>
            </tr>
            <tr>
              <td colSpan={2}>
                <pre className="sinopsis">{sinopsis}</pre>
              </td>
            </tr>
          </thead>
        </table>
      </section>
    </>
  );
};

Descripcion.propTypes = {
  novela: PropTypes.object.isRequired,
};

// Descripcion.propTypes = {
//   novela: PropTypes.shape({
//     imagen: PropTypes.string,
//     autor: PropTypes.string,
//     nombres: PropTypes.string,
//     volumenes: PropTypes.number,
//     Activo: PropTypes.bool,
//     sinopsis: PropTypes.string,
//     generos: PropTypes.arrayOf(PropTypes.string),
//   }).isRequired,
// };

export default Descripcion;
