import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import "../css/styleCards.css";
import AppUse from "../Hooks/AppUse";
import bg from "../img/portada.png";
import dbFirebase from "../Config/firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import { fromToJsonMapNovel } from "../Services/useServices";

const Cards = () => {
  const {
    setBgHeader,
    setTitle,
    setTitleText,
    setHeigth,
    setHidden,
    quitarDark,
  } = AppUse();
  const [datos, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const name_collection = import.meta.env.VITE_COLLECTION_NOVEL;

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const solicitud = async () => {
      try {
        const novelCol = collection(dbFirebase, name_collection);
        const novelSnapshot = await getDocs(novelCol);
        const novelList = novelSnapshot.docs.map((doc) => ({
          ...doc.data(),
          idNovel: doc.id,
        }));
        const fromToJson = novelList.map(fromToJsonMapNovel);

        setData(fromToJson);
        setFilteredData(fromToJson);
        setBgHeader(bg);
        setTitle("ShigatsuTranslations");
        setTitleText("Una pagina dedicada a traducir novelas ligeras");
        setHeigth(false);
        setHidden(false);
      } catch (error) {
        setData([]);
        setFilteredData([]);
      } finally {
        setLoader(false);
      }
      // const { data } = await axios("/Content/data.json");
    };
    solicitud();
  }, []);

  useEffect(() => {
    const filterData = datos.filter((item) =>
      item.titleNovel.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filterData);
  }, [datos, search]);

  const inputBgColor = quitarDark ? "dark:bg-gray-700" : "bg-gray-50";
  const inputBorderColor = quitarDark
    ? "dark:border-gray-600"
    : "border-gray-300";
  const inputTextColor = quitarDark ? "dark:text-white" : "text-gray-900";
  const placeholderColor = quitarDark
    ? "dark:placeholder-gray-400"
    : "placeholder-gray-400";
  const focusRingColor = quitarDark
    ? "focus:ring-blue-500"
    : "focus:ring-blue-500";
  const focusBorderColor = quitarDark
    ? "focus:border-blue-500"
    : "focus:border-blue-500";

  const activeTextColor = quitarDark ? "text-[#ffffff]" : "text-[#000000]";
  if (loader) return <Loading />;
  return (
    <>
      <section className="flex w-11/12 margin">
        <form className="w-full mt-5" onSubmit={handelSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative shadow-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className={`w-4 h-4 ${inputTextColor}`}
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
              className={`block w-full p-4 pl-10 text-sm ${inputTextColor} border ${inputBorderColor} rounded-lg ${inputBgColor} ${focusRingColor} ${focusBorderColor} ${placeholderColor}`}
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
              novela.statusNovel === "activo" && (
                <figure key={novela.idNovel} className="cards">
                  <span className="cards_tipo">{novela.tipoNovela}</span>
                  <div className="cards_img">
                    <div
                      className="cards_back"
                      style={{ backgroundImage: `url(${novela.portada})` }}
                    ></div>
                    <div
                      className="cards_back2"
                      style={{ backgroundImage: `url(${novela.portada})` }}
                    ></div>
                    <div className="overlay">
                      <h2 className="overlay_title">Sinopsis:</h2>
                      <p className="overlay_descripcion">
                        {novela.sinopsis.substring(0, 90) + "...."}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/novela/${novela.idNovel}?nombre=${encodeURIComponent(
                      novela.titleNovel
                    )}`}
                    className="font-bold card_title"
                  >
                    <p className={`cards_title ${activeTextColor}`}>
                      {novela.titleNovel}
                    </p>
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
