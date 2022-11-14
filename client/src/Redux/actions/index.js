import axios from "axios";

import {
   GET_SNEAKERS,
   SEARCH_SNEAKER,
   GET_DETAIL,
   FILTRO_GENERO,
   FILTRO_MARCA,
   SORT_BY_ALPHABET,
   FILTRO_PRECIOS
} from "./actionTypes";

export const getSneakers = () => {
   return async (dispatch) => {
      try {
         const sneakers = await axios.get("http://localhost:3001/sneakers");
         /* console.log(response) */

         return dispatch({
            type: GET_SNEAKERS,
            payload: sneakers.data,
         });
      } catch (error) {
         console.log("error trying to GET_SNEAKERS", error);
      }
   };
};

export const getSearchTitle = (title) => {
   return async function (dispatch) {
      try {
         const response = await axios.get(
            `http://localhost:3001/sneakers/?title=${title}`
         );
         return dispatch({
            type: SEARCH_SNEAKER,
            payload: response.data,
         });
      } catch (error) {
         console.log("error trying to SEARCH_SNEAKER");
      }
   };
};

/* CREAR PRODUCTO */

export function CreateNewProduct(payload) {
   return async function () {
      const response = await axios.post("RutaBack", payload);
      return response;
   };
}


export function getDetail(id) {
   return async function (dispatch) {
      try {
         let json = await axios.get(`http://localhost:3001/sneakers/${id}`)
         return dispatch({
            type: GET_DETAIL,
            payload: json.data
         })
      } catch (error) {
         return alert("Detail not found")
      }
   }
}
export const filtroMarca = (payload) => {
   console.log("FiltroMarca")
   return {
      type: FILTRO_MARCA,
      payload,
   };
};
export const filtroGenero = (payload) => {
   console.log("Filtro Generos")
   return {
      type: FILTRO_GENERO,
      payload,
   };
};

export const alphaSort = (payload) => {
   console.log("Ordenamiento alfa")
     return {
       type: SORT_BY_ALPHABET,
       payload,
     };
  };

  export const filtroPrecios = (payload) => {
   console.log("Filtro x precios")
   return {
      type: FILTRO_PRECIOS,
      payload,
   };
};
