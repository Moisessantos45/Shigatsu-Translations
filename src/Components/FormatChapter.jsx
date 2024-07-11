const unirSimbolos = (texto) => {
  const theme = document.documentElement.classList.contains("darkMode");
  const themeActive = theme ? "bg-zinc-700" : "bg-gray-300";
  const symbols = [
    "◊◊◊",
    "◊◊",
    "◊",
    "$$$",
    "$$",
    "$",
    "**",
    "*",
    "§§§",
    "◆ ◆ ◆",
    "☆",
    "☆☆",
    "☆☆☆",
    "++++++++",
    "++++++",
    "+++++++++",
    "+++++++",
    "+++++++++++++++++++++++++",
    "+++++",
  ];
  const notasTraductor = "-----";
  let result = [];
  let preBlock = "";
  let insideNote = false;

  for (let line of texto.split("\n")) {
    if (line.trim() === notasTraductor) {
      if (!insideNote) {
        insideNote = true;
        if (preBlock !== "") {
          result.push(
            <pre key={result.length} className="whitespace-pre-line">
              {preBlock}
            </pre>
          );
          preBlock = "";
        }
      } else {
        insideNote = false;
        result.push(
          <span
            key={result.length}
            className={`m-auto mt-2 mb-2 flex w-full p-1 ${themeActive} rounded-lg`}
          >
            {preBlock}
          </span>
        );
        preBlock = "";
      }
    } else if (insideNote) {
      preBlock += line + "\n";
    } else {
      let isSymbol = symbols.includes(line.trim());
      if (isSymbol) {
        if (preBlock !== "") {
          result.push(
            <pre key={result.length} className="whitespace-pre-line">
              {preBlock}
            </pre>
          );
          preBlock = "";
        }
        result.push(
          <span key={result.length} className="m-auto flex justify-center w-24">
            {line}
          </span>
        );
      } else {
        preBlock += line + "\n";
      }
    }
  }

  if (preBlock !== "") {
    result.push(
      <pre key={result.length} className="whitespace-pre-line">
        {preBlock}
      </pre>
    );
  }

  return result;
};

function formatearTextoConImagenes(texto) {
  if (texto.length < 0) return [];
  if (!new RegExp("https://i.ibb.co", "i").test(texto)) {
    return unirSimbolos(texto);
  }
  const fragmentos = texto.split("\nhttps://i.ibb.co");
  return fragmentos.flatMap((fragmento, i) => {
    if (i === 0) {
      return [unirSimbolos(fragmento)];
    } else {
      const indiceEspacio = fragmento.indexOf("\n");
      const url = `https://i.ibb.co${
        indiceEspacio !== -1 ? fragmento.slice(0, indiceEspacio) : fragmento
      }`;
      const resto = indiceEspacio !== -1 ? fragmento.slice(indiceEspacio) : "";
      return [
        <figure key={i}>
          <img src={url.trim()} alt="" />
        </figure>,
        unirSimbolos(resto),
      ];
    }
  });
}

export {formatearTextoConImagenes};
