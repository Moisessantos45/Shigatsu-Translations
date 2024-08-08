import { v4 as uuidv4 } from "uuid";

const SYMBOLS = [
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

const NOTAS_TRADUCTOR = "-----";
const PUNTO_VISTA = "Punto de vista de";

const unirSimbolos = (texto) => {
  const theme = document.documentElement.classList.contains("darkMode");
  const themeActive = theme ? "bg-zinc-700" : "bg-gray-300";

  const processLine = (line, isInsideNote) => {
    if (line.trim() === NOTAS_TRADUCTOR) {
      return { type: "toggle", isInsideNote: !isInsideNote };
    }
    if (isInsideNote) {
      return { type: "note", content: line };
    }
    if (SYMBOLS.includes(line.trim())) {
      return { type: "symbol", content: line };
    }
    if (line.trim().startsWith(PUNTO_VISTA)) {
      return { type: "puntoVista", content: line };
    }
    return { type: "text", content: line };
  };

  const lines = texto.split("\n");
  let result = [];
  let currentBlock = "";
  let isInsideNote = false;

  for (const line of lines) {
    const {
      type,
      content,
      isInsideNote: newNoteState,
    } = processLine(line, isInsideNote);

    if (type === "toggle") {
      if (currentBlock) {
        result.push(
          isInsideNote ? (
            <span
              key={uuidv4()}
              className={`m-auto mt-2 mb-2 flex w-full p-1 ${themeActive} rounded-lg`}
            >
              {currentBlock}
            </span>
          ) : (
            <pre key={uuidv4()} className="whitespace-pre-line">
              {currentBlock}
            </pre>
          )
        );

        currentBlock = "";
      }
      isInsideNote = newNoteState;
    } else if (type === "symbol") {
      if (currentBlock) {
        result.push(
          <pre key={uuidv4()} className="whitespace-pre-line">
            {currentBlock}
          </pre>
        );
        currentBlock = "";
      }
      result.push(
        <span key={uuidv4()} className="m-auto flex justify-center w-24">
          {content}
        </span>
      );
    } else if (type === "puntoVista") {
      if (currentBlock) {
        result.push(
          <pre key={uuidv4()} className="whitespace-pre-line">
            {currentBlock}
          </pre>
        );
        currentBlock = "";
      }
      result.push(
        <span
          key={uuidv4()}
          className="block w-full bg-gray-100 dark:bg-gray-700 p-1 mb-5 rounded"
        >
          {content}
        </span>
      );
    } else {
      currentBlock += content + "\n";
    }
  }

  if (currentBlock) {
    result.push(
      <pre key={uuidv4()} className="whitespace-pre-line">
        {currentBlock}
      </pre>
    );
  }

  return result;
};

const formatearTextoConImagenes = (texto) => {
  if (texto.length === 0) return [];

  if (!/https:\/\/res\.cloudinary\.com/i.test(texto)) {
    return unirSimbolos(texto);
  }

  return texto.split("\nhttps://res.cloudinary.com").flatMap((fragmento, i) => {
    if (i === 0) return unirSimbolos(fragmento);

    const [url, ...restoArray] = fragmento.split("\n");
    const resto = restoArray.join("\n");

    return [
      <figure key={uuidv4()}>
        <img
          src={`https://res.cloudinary.com${url.trim()}`}
          alt="imagen del capitulo"
        />
      </figure>,
      ...unirSimbolos(resto),
    ];
  });
};

export { formatearTextoConImagenes };
