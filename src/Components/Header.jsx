import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../css/styleHeader.css";
import icon_logo from "../img/logo.png";
import light from "../img/modo_claro.png";
import dark from "../img/modo-oscuro.png";
import AppUse from "../Hooks/AppUse";

const Header = () => {
  const {
    bg_header,
    titleHeader,
    titleTextHeader,
    heigth,
    hidden,
    setDark,
    quitarDark,
  } = AppUse();

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

  const borderColor = quitarDark ? "border-[#d0dbe7]" : "border-[#4a4a4a]";
  const activeBorderColor = quitarDark
    ? "border-b-[#1980e6]"
    : "border-b-[#1980e6]";
  const activeTextColor = quitarDark ? "text-[#ffffff]" : "text-[#000000]";
  const inactiveTextColor = quitarDark ? "text-[#b0bec8]" : "text-[#7a7a7a]";

  return (
    <>
      <div
        className={`relative flex flex-col ${
          quitarDark ? "bg-[#20202C]" : ""
        }  overflow-x-hidden`}
        style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
      >
        <div
          className={`flex items-center  ${
            quitarDark ? "bg-[#20202C]" : ""
          } p-4 pb-2 justify-between`}
        >
          <h2 className="text-[#ffffff] text-lg md:text-xl lg:text-2xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            <Link to="/">
              <img
                src={icon_logo}
                alt="Shigatsu Translation"
                className="h-14 md:h-14 lg:h-16 absolute top-3 left-2 md:left-3 lg:top-4 lg:left-4"
              />
            </Link>
          </h2>
          <div className="flex w-12 items-center justify-end">
            <button
              className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-[#ffffff] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0 btn_dark"
              style={{
                backgroundImage: `url(${quitarDark ? dark : light})`,
                filter: "invert(1)",
              }}
              onClick={modoDark}
            ></button>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <div
            className={`flex ${
              heigth ? "max-h-[380px]" : "sm:min-h-[480px] h-[380px]"
            } flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("${bg_header}")`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                {titleHeader}
              </h1>
              <h2 className="text-white text-sm md:text-base lg:text-lg font-normal leading-normal">
                {titleTextHeader}
              </h2>
            </div>
            <button className="min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl px-4 md:px-5 bg-[#1980e6] text-slate-50 text-sm md:text-base font-bold leading-normal tracking-[0.015em] h-2"></button>
          </div>
        </div>
        {!hidden && (
          <div className="pb-3 md:w-11/12 w-full m-auto">
            <div
              className={`flex border-b ${borderColor} px-4 gap-8 overflow-x-auto`}
            >
              <NavLink
                className={`flex flex-col items-center justify-center border-b-[3px] ${activeBorderColor} ${activeTextColor} pb-[13px] pt-4`}
                to={`novela/wEXFKZoJZRpChvV9E5gA/${encodeURIComponent(
                  "Kamatte Shinsotsu-chan"
                )}`}
              >
                <p
                  className={`text-xs md:text-base font-bold leading-normal tracking-[0.015em] ${activeTextColor}`}
                >
                  Kamatte Shinsotsu-chan
                </p>
              </NavLink>
              <NavLink
                className={`flex flex-col items-center justify-center border-b-[3px] border-b-transparent ${inactiveTextColor} pb-[13px] pt-4`}
                to={`novela/YVnG4p1Bdy5sbjCOCRwy/${encodeURIComponent(
                  "Yuujin-chara"
                )}`}
              >
                <p
                  className={`text-sm md:text-base font-bold leading-normal tracking-[0.015em] ${inactiveTextColor}`}
                >
                  Yuujin-chara
                </p>
              </NavLink>
              <NavLink
                className={`flex flex-col items-center justify-center border-b-[3px] border-b-transparent ${inactiveTextColor} pb-[13px] pt-4`}
                to={`novela/iwAda49vXUdhaNzz2DXF/${encodeURIComponent(
                  "It Seems I Was Hitting"
                )}`}
              >
                <p
                  className={`text-sm md:text-base font-bold leading-normal tracking-[0.015em] ${inactiveTextColor}`}
                >
                  it Seems
                </p>
              </NavLink>
              <a
                className={`flex flex-col items-center justify-center border-b-[3px] border-b-transparent ${inactiveTextColor} pb-[13px] pt-4`}
                href="https://www.facebook.com/people/Shigatsu-Translation/100083095400806/"
                target="_blank"
                rel="noreferrer"
              >
                <p
                  className={`text-sm md:text-base font-bold leading-normal tracking-[0.015em] ${inactiveTextColor}`}
                >
                  Facebook
                </p>
              </a>
            </div>
          </div>
        )}
        <div className={`h-5 ${quitarDark ? "bg-[#20202C]" : ""}`} />
      </div>
    </>
  );
};

export default Header;
