import React from "react";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSneakers } from "../../Redux/actions/index";

import Cards from "../Cards/Cards";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../NavBar/SearchBar/SearchBar"
import styles from "./Home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const sneakers = useSelector((state) => state.allSneakers);

  //PAGINADO:
  const [currentPage, setCurrentPage] = useState(1);
  const [sneakersPerPage, setSneakersPerPage] = useState(9);
  const indexLastSneaker = currentPage * sneakersPerPage;
  const indexFirstSneaker = indexLastSneaker - sneakersPerPage;
  const currentSneaker = sneakers.slice(indexFirstSneaker, indexLastSneaker);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getSneakers());
  }, [dispatch]);

  console.log(sneakers);

  return (
    <div className={styles.fondo}>
      {sneakers.length > 0 ? (
        <div>
          <h1>HYPE SHOP</h1>

          <div><SearchBar/></div>

          <div>
            <Paginado
              sneakersPerPage={sneakersPerPage}
              sneakers={sneakers.length}
              paginado={paginado}
            />
          </div>

          <div>
            <Cards sneakers={currentSneaker} />
          </div>

          <div>
            <Paginado
              sneakersPerPage={sneakersPerPage}
              sneakers={sneakers.length}
              paginado={paginado}
            />
          </div>
        </div>
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};
export default Home;
