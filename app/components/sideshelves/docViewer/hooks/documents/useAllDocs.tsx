"use client";

import useDoc2 from "./useDoc2";
import useDoc3 from "./useDoc3";
import useDoc4 from "./useDoc4";
import useDoc5 from "./useDoc5";
import useDoc6 from "./useDoc6";
import useDoc7 from "./useDoc7";
import useDoc8 from "./useDoc8";
import useDoc9 from "./useDoc9";
import useDoc10 from "./useDoc10";
import useDoc11 from "./useDoc11";

const useAllDocs = () => {

  const theDocs = [
    { doc: useDoc2().Doc2, name: "Mella Yella" },
    { doc: useDoc3().Doc3, name: "Utopia" },
    { doc: useDoc4().Doc4, name: "Dolphin" },
    { doc: useDoc5().Doc5, name: "Zoid" },
    { doc: useDoc6().Doc6, name: "Cooper" },
    { doc: useDoc7().Doc7, name: "Introspect" },
    { doc: useDoc8().Doc8, name: "Chikane" },
    { doc: useDoc9().Doc9, name: "Beetle" },
    { doc: useDoc10().Doc10, name: "Structura" },
    { doc: useDoc11().Doc11, name: "Prince" },
  ];

  return { theDocs };
};

export default useAllDocs;
