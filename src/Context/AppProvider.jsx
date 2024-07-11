import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [bg_header, setBgHeader] = useState("");
  const [titleHeader, setTitle] = useState("");
  const [titleTextHeader, setTitleText] = useState("");
  const [heigth, setHeigth] = useState(false);
  const [hidden, setHidden] = useState(false);
  const locarDark = localStorage.getItem("theme") === "darkMode";
  const [quitarDark, setDark] = useState(locarDark);
  return (
    <AppContext.Provider
      value={{
        bg_header,
        setBgHeader,
        titleHeader,
        setTitle,
        titleTextHeader,
        setTitleText,
        heigth,
        setHeigth,
        hidden,
        setHidden,
        quitarDark,
        setDark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppContext;

export { AppProvider };
