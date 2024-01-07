import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [bg_header, setBgHeader] = useState("");
  const [titleHeader, setTitle] = useState("");
  const [titleTextHeader, setTitleText] = useState("");
  const [heigth,setHeigth]=useState(false)
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
        setHeigth
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
