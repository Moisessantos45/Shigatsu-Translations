const fromToJsonMapNovel = (data) => {
  return {
    titleNovel: data["titleNovel"],
    volumenesActuales: data["volumenesActuales"],
    nombresAlternos: data["nombresAlternos"],
    background: data["background"],
    portada: data["portada"],
    tipoNovela: data["tipoNovela"],
    generos: data["generos"],
    autor: data["autor"] || "",
    sinopsis: data["sinopsis"],
    ilustracionesAtuales: data["ilustracionesAtuales"] || "",
    statusNovel: data["statusNovel"],
    personajes: data["personajes"] || "[]",
    idNovel: data["idNovel"],
    novelId: data["novelId"],
  };
};

const fromToJsonMapVol = (data) => {
  return {
    createdAt: data["createdAt"],
    disponibilidad: data["disponibilidad"],
    links: data["links"],
    nombreNovela: data["nombreNovela"],
    novelId: data["novelId"],
    portadaVolumen: data["portadaVolumen"],
    volumen: data["volumen"],
    volumenId: data["volumenId"],
  };
};

const fromToJsonMapChapter = (data) => {
  return {
    capituloId: data["capituloId"],
    nombreNovela: data["nombreNovela"],
    capitulo: data["capitulo"],
    nombreCapitulo: data["nombreCapitulo"],
    volumenPertenece: data["volumenPertenece"],
    contenido: data["contenido"],
    novelId: data["novelId"],
    createdAt: data["createdAt"],
  };
};

const fromToJsonMapPost = (data) => {
  return {
    createdAt: data["createdAt"],
    namePost: data["namePost"] || "",
    bg: data["bg"] || "https://i.ibb.co/BgVKqzR/logo-firefly.jpg",
    numberPost: data["numberPost"] || "",
    novelId: data["novelId"] || "",
    nombreNovela: data["nombreNovela"],
  };
};

export {
  fromToJsonMapNovel,
  fromToJsonMapVol,
  fromToJsonMapChapter,
  fromToJsonMapPost,
};
