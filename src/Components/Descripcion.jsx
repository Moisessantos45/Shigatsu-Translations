import PropTypes from "prop-types";
import AppUse from "../Hooks/AppUse";

const Descripcion = ({ novela }) => {
  const { quitarDark } = AppUse();

  const {
    titleNovel,
    volumenesActuales,
    nombresAlternos,
    portada,
    tipoNovela,
    generos,
    autor,
    sinopsis,
    statusNovel,
  } = novela;

  const bgColor = quitarDark
    ? "bg-slate-900 shadow-xl"
    : "bg-[#e9eaed] shadow-md";
  const textColorPrimary = quitarDark ? "text-slate-300" : "text-gray-900";
  const textColorSecondary = quitarDark ? "text-slate-400" : "text-gray-700";
  const textColorTertiary = quitarDark ? "text-slate-200" : "text-gray-800";

  return (
    <>
      <section
        className={`sm:container w-10/12 mx-auto p-6 mt-5 ${bgColor} rounded-lg flex flex-col md:flex-row items-center`}
      >
        <figure className="mb-6 md:mb-0 md:mr-6 flex-shrink-0">
          <img
            src={portada}
            alt="portada"
            className="w-52 sm:w-72 md:w-80 lg:w-96 rounded-md shadow-lg"
          />
        </figure>

        <div className="flex-1">
          <h1
            className={`sm:text-2xl text-xl font-bold mb-4 ${textColorPrimary}`}
          >
            {titleNovel}
          </h1>
          <p className={`text-xl mb-6 ${textColorSecondary}`}>
            {tipoNovela.toLocaleLowerCase() === "ln"
              ? " (Light Novel)"
              : "Web Novel"}
          </p>
          <div className="flex flex-col space-y-4 mb-6">
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                Estado:{" "}
              </span>
              <span className={textColorTertiary}>
                {statusNovel === "activo" ? "En curso" : "Finalizado"}
              </span>
            </div>
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                Nombres Alternativos:{" "}
              </span>
              <span className={textColorTertiary}>{nombresAlternos}</span>
            </div>
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                Géneros:{" "}
              </span>
              <span className={textColorTertiary}>
                {generos.split(",").map((genero, index) => (
                  <span key={index}>{genero}</span>
                ))}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                Volumenes:{" "}
              </span>
              <span className={textColorTertiary}>{volumenesActuales}</span>
            </div>
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                Author:{" "}
              </span>
              <span className={textColorTertiary}>{autor}</span>
            </div>
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                Traductor:{" "}
              </span>
              <span className={textColorTertiary}>ShigatsuTranslations</span>
            </div>
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                Corrector:{" "}
              </span>
              <span className={textColorTertiary}>ShigatsuTranslations</span>
            </div>
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                Cleaner:{" "}
              </span>
              <span className={textColorTertiary}>
                ShigatsuTranslations && Moy45
              </span>
            </div>

            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                EPUB:{" "}
              </span>
              <span className={textColorTertiary}>?</span>
            </div>
            <div>
              <span className={`${textColorSecondary} font-semibold`}>
                PDF:{" "}
              </span>
              <span className={textColorTertiary}>?</span>
            </div>
          </div>
        </div>
      </section>
      <article className={`p-6 rounded-md mt-8 container mx-auto`}>
        <h2 className={`text-2xl font-bold mb-4 ${textColorPrimary}`}>
          Sinopsis
        </h2>
        <pre className={`sinopsis overflow-hidden ${textColorTertiary}`}>
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
