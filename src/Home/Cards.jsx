import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import axios from "axios";
import "../css/styleCards.css";
import AppUse from "../Hooks/AppUse";
import bg from "../img/portada.png";

const Cards = () => {
  const { setBgHeader, setTitle, setTitleText, setHeigth, setHidden } =
    AppUse();
  const [datos, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const apiKey =
    "$2a$10$MIgcnZC4XKF." + "WREJQBQgq" + import.meta.env.VITE_API_KEY;

  const accesKey = "$2a$10$jMdAcKIvA40FjzM" + import.meta.env.VITE_ACCESS_KEY;

  const binId = "665d231cacd3cb34a851d916";
  const handelSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const solicitud = async () => {
      try {
        const { data } = await axios(`https://api.jsonbin.io/v3/b/${binId}`, {
          headers: {
            "X-Master-Key": apiKey,
            "X-Access-Key": accesKey,
          },
        });
        // console.log(data.record);
        const novel = Object.keys(data.record)
          .map((key) =>
            data.record[key].map((item) => {
              return item;
            })
          )
          .flat();
        setData(novel);
        setFilteredData(novel);
        setBgHeader(bg);
        setTitle("ShigatsuTranslations");
        setTitleText("Una pagina dedicada a traducir novelas ligeras");
        setHeigth(false);
        setHidden(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
      // const { data } = await axios("/Content/data.json");
    };
    solicitud();
  }, []);
  useEffect(() => {
    const filterData = datos.filter((item) =>
      item.titulo.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filterData);
  }, [datos, search]);

  if (loader) return <Loading />;
  return (
    <>
      <section className="flex w-11/12 margin">
        <form className="w-full" onSubmit={handelSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative shadow-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
          </div>
        </form>
      </section>
      <section className=" w-12/12 relative flex flex-wrap margin justify-around p-2">
        <div className="h-32 m-auto mt-2 flex justify-evenly text-center flex-col w-12/12">
          <span className="h-1 w-full flex justify-center items-center rounded-md color_line"></span>
          <h1 className="title text-2xl uppercase font-bold">
            Novelas en Traduccion
          </h1>
          <span className="h-1 w-full flex justify-center items-center rounded-md color_line"></span>
        </div>
        {filteredData.length > 0 ? (
          filteredData.map(
            (novela) =>
              novela.Activo == true && (
                <figure key={novela.id} className="cards">
                  <span className="cards_tipo">{novela.tipo}</span>
                  <div className="cards_img">
                    <div
                      className="cards_back"
                      style={{ backgroundImage: `url(${novela.imagen})` }}
                    ></div>
                    <div
                      className="cards_back2"
                      style={{ backgroundImage: `url(${novela.imagen})` }}
                    ></div>
                    <div className="overlay">
                      <h2 className="overlay_title">Sinopsis:</h2>
                      <p className="overlay_descripcion">
                        {novela.sinopsis.substring(0, 90) + "...."}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/novela/${novela?.clave}`}
                    className="font-bold card_title"
                  >
                    <p className="cards_title">{novela.titulo}</p>
                  </Link>
                </figure>
              )
          )
        ) : (
          <h1 className="flex font-bold text-3xl shadow-lg">No hay novelas</h1>
        )}
      </section>
    </>
  );
};

export default Cards;
