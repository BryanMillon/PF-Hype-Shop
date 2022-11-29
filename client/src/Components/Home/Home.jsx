import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers } from "../../Redux/actions/index";

import BounceExample from '../ChatBot/BounceExample'
//estilos 
import LightSpeed from 'react-reveal/LightSpeed';
import Zoom from 'react-reveal/Zoom';


import Cards from "../Cards/Cards";
import Paginado from "../Paginado/Paginado";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";
import Filtrado from "../NavBar/Filtrado/Filtrado";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";

const Home = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector((state) => state.allSneakers);

  //PAGINADO:
  const [currentPage, setCurrentPage] = useState(1);
  const [sneakersPerPage, setSneakersPerPage] = useState(9);
  const indexLastSneaker = currentPage * sneakersPerPage;
  const indexFirstSneaker = indexLastSneaker - sneakersPerPage;
  const currentSneaker = sneakers.slice(indexFirstSneaker, indexLastSneaker);

  const nextPage = (pageNumber) => {
    if (currentPage < Math.ceil(sneakers.length / sneakersPerPage))
      setCurrentPage(pageNumber);
  };
  const prevPage = (pageNumber) => {
    if (currentPage > 1) setCurrentPage(pageNumber);
  };

  const paginaUno = () => {
    setCurrentPage(1);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getSneakers());
  }, [dispatch]);

  // console.log(sneakers);

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <div>
        <NavBar paginaUno={paginaUno} />

        <LightSpeed right delay={500} ssrFadeout>
       
          <Filtrado setIsLoading={setIsLoading} paginaUno={paginaUno} />
       
        </LightSpeed>

        {isLoading ? (
          <Loading setIsLoading={setIsLoading} isLoading={isLoading} />
        ) : sneakers.length ? (
          <div>


            <Zoom ssrFadeout>
              <Cards sneakers={currentSneaker} />
            </Zoom>
            
            <BounceExample />

            <Paginado
              nextPage={nextPage}
              prevPage={prevPage}
              currentPage={currentPage}
              sneakersPerPage={sneakersPerPage}
              sneakers={sneakers.length}
            />
          </div>
        ) : (
          <Button
            title={
              "No se encontraron productos. Por favor, recargar la pagina o reiniciar filtros."
            }
            textButton={"Recargar"}
            onClick={refreshPage}
          />
        )}
      </div>
    </div>
  );
};
export default Home;

