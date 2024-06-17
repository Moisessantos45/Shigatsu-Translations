import PropTypes from "prop-types";

const Descripcion = ({ novela }) => {
  // console.log(novela);
  const {
    imagen,
    autor,
    nombres,
    volumenes,
    Activo,
    sinopsis,
    generos,
    titulo,
    tipo,
  } = novela;
  return (
    <>
      <section className="sm:container w-10/12 mx-auto p-6 mt-5 bg-slate-900 rounded-lg shadow-xl flex flex-col md:flex-row items-center">
        <figure className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
          <img
            src={imagen}
            alt="portada"
            className="w-52 sm:w-72 md:w-80 lg:w-96 rounded-md shadow-lg"
          />
        </figure>

        <div className="flex-1">
          <h1 className="sm:text-2xl text-xl font-bold mb-4 text-slate-300">
            {titulo}
          </h1>
          <p className="text-xl mb-6 text-slate-400">
            {tipo.toLocaleLowerCase() === "ln" ? " (Light Novel)" : "Web Novel"}
          </p>
          <div className="flex flex-col space-y-4 mb-6">
            <div>
              <span className="text-slate-400 font-semibold">Estado: </span>
              <span className="text-slate-200">
                {Activo ? "En curso" : "Finalizado"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">
                Nombres Alternativos:{" "}
              </span>
              <span className="text-slate-200">{nombres}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Géneros: </span>
              <span className="text-slate-200">
                {generos.split(",").map((genero, index) => (
                  <span key={index}>{genero}</span>
                ))}
              </span>
            </div>
          </div>

          {/* <div className="flex space-x-4 mb-6">
            <button className="bg-orange-700 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded">
              Encargados
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded">
              D. específicos
            </button>
          </div> */}

          <div className="space-y-2">
            <div>
              <span className="text-slate-400 font-semibold">Volumenes: </span>
              <span className="text-slate-200">{volumenes}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Author: </span>
              <span className="text-slate-200">{autor}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Traductor: </span>
              <span className="text-slate-200">ShigatsuTranslations</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Corrector: </span>
              <span className="text-slate-200">ShigatsuTranslations</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Cleaner: </span>
              <span className="text-slate-200">
                ShigatsuTranslations && Moy45
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-semibold">EPUB: </span>
              <span className="text-slate-200">?</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">PDF: </span>
              <span className="text-slate-200">?</span>
            </div>
          </div>
        </div>
      </section>
      <article className="p-6 rounded-md shadow-inner mt-8 container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-slate-300">Sinopsis</h2>
        <pre className="sinopsis overflow-hidden text-slate-200">
          {sinopsis}
        </pre>
      </article>
    </>
  );
};

Descripcion.propTypes = {
  novela: PropTypes.object.isRequired,
};

export default Descripcion;
