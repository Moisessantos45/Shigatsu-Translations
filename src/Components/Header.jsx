import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/styleHeader.css";
import icon_logo from "../img/logo.png";
import bars from "../img/bars.png";
import light from "../img/modo_claro.png";
import dark from "../img/modo-oscuro.png";
import AppUse from "../Hooks/AppUse";

const Header = () => {
  const { bg_header, titleHeader, titleTextHeader, heigth } = AppUse();
  const locarDark = localStorage.getItem("theme") === "darkMode";
  const [mostrar, setMostrar] = useState(false);
  const [quitarDark, setDark] = useState(locarDark);

  const mostrarMenu = () => {
    setMostrar(!mostrar);
  };

  const modoDark = () => {
    setDark(!quitarDark);
  };

  useEffect(() => {
    if (quitarDark) {
      document.documentElement.classList.add("darkMode");
      localStorage.setItem("theme", "darkMode");
    } else {
      document.documentElement.classList.remove("darkMode");
      localStorage.setItem("theme", "lightMode");
    }
  }, [quitarDark]);

  return (
    <>
      <img
        src={icon_logo}
        alt=""
        className="absolute w-32 h-20 cursor-pointer hover:scale-125 btn_logo"
      />
      <header
        className={`header m-auto relative top-0 left-0 ${
          heigth
            ? "h-[50vh]"
            : " h-[30vh] sm:h-[50vh] tablet:h-[65vh] lg:h-[90vh]"
        }`}
        style={{ backgroundImage: `url(${bg_header})` }}
      >
        <img
          src={bars}
          alt=""
          className={`w-10 h-10 m-1 absolute btn_bars ${
            mostrar ? "mover_bar" : ""
          }`}
          onClick={mostrarMenu}
        />
        <nav
          className={`header_nav flex absolute top-0 ${
            mostrar ? "mostrar_nav" : ""
          }`}
        >
          <ul className="nav_item flex items-center">
            <li className="flex nav_items w-auto justify-center items-center">
              <Link to="/" className="border_color flex hover:text-pink-600 font-bold text-lg capitalize">
                Home
              </Link>
            </li>
            <li className="flex nav_items justify-center items-center">
              <Link to="novela/Kamatte_Shinsotsu-chan_ga" className="border_color flex hover:text-pink-600 font-bold text-lg capitalize">
                Kamatte Shinsotsu-chan
              </Link>
            </li>
            <li className="flex nav_items justify-center items-center">
              <Link
                to="novela/Yuujin-chara_no_Ore_ga_Motemakuru_Wakenaidarou"
                className="border_color flex hover:text-pink-600 font-bold text-lg capitalize"
              >
                Yuujin-chara
              </Link>
            </li>
            <li className="flex nav_items justify-center items-cente">
              <Link
                to="novela/It_Seems_I_Was_Hitting"
                className="border_color flex hover:text-pink-600 font-bold text-lg capitalize"
              >
                it Seems
              </Link>
            </li>
            <li className="flex nav_items w-auto">
              <Link className="border_color flex hover:text-pink-600 font-bold text-lg capitalize  outline rounded-lg hover:outline-green-500 items-center p-1">
                Facebook
              </Link>
            </li>
            <li className="flex nav_items w-auto">
              <button
                className="flex hover:text-pink-600 font-bold capitalize bg-slate-50 p-1 rounded-lg items-center btn_dark"
                style={{ backgroundImage: `url(${quitarDark ? dark : light})` }}
                onClick={modoDark}
              ></button>
            </li>
          </ul>
        </nav>
        <div className={`header-content ${heigth ? " bottom-2 w-8/12" : ""}`}>
          <h2
            className={`${
              heigth ? " text-base uppercase leading-relaxed" : ""
            } font-bold`}
          >
            {titleHeader}
          </h2>
          <div className="line"></div>
          <h1 className=" font-bold">{titleTextHeader}</h1>
        </div>
      </header>
    </>
  );
};

export default Header;
