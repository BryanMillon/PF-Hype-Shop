import React, { useEffect } from "react";
import { getDetail, detailZero,DeleteProduct } from "../../Redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";
// CARRITO:
import useLocalStorage from "../useLocalStorage/useLocalstorage";
import swal from "sweetalert";


const CardDetailAdmin = (props) => {
  const dispatch = useDispatch();
  const sneakerDetail = useSelector((state) => state.detail);
  const history = useHistory()

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    // desmontando Componente:
    return () => { // arrow para poder ejecutarlo 
      dispatch(detailZero());
    };
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // CARRITO:
  const [item, saveItem] = useLocalStorage("SNEAKERS", []);

  const addCarryNewQuantity = (id, cantidad) => {
    const arrayNewQuantity = [];
    item.forEach(it => {
      if (it.id === id) {
        arrayNewQuantity.push({
          ...it,
          cantidad: cantidad
        })
      } else {
        arrayNewQuantity.push(it)
      }
    })
    saveItem(arrayNewQuantity)
  }

  const borrarProducto = () => {
    let id =sneakerDetail.id
    dispatch(DeleteProduct({id}))

    dispatch(getDetail(props.match.params.id))

  }

  // console.log(sneakerDetail);

  return (
    <>
      {
        sneakerDetail.id ?
          (
            <div className="bg-white">

              <div className="pt-6">

                <Link to='/'>
                  <button
                    type="submit"
                    className="mt-0 ml-6 flex w-3 items-center justify-center rounded-md border border-transparent bg-[#f15a24]  py-2 px-9 text-base font-medium text-white hover:bg-orange-500 focus:outline-none  "
                  >
                    Volver
                  </button>
                </Link>
                {/* Image gallery */}
                <Carousel infinite={true} responsive={responsive}>

                  {sneakerDetail.pictures?.map((e) => (
                    <div>
                      <img src={e} alt="i" />
                    </div>
                  ))}

                </Carousel>
                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                  <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{sneakerDetail.title}</h1>
                  </div>
                  {console.log(sneakerDetail)}
                  {/* Options */}
                  <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-gray-900">PRECIO: ${sneakerDetail.price}</p>

                    {/* Sizes */}
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        {/* {console.log(onAddCarry(sneakerDetail))} */}
                        <h3 className="text-sm font-medium text-gray-900">TALLA</h3>
                        {sneakerDetail.sizes.map(el =>
                          <p className="text-sm font-medium text-indigo-600 hover:text-indigo-500"> {el}</p>
                        )}
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mt-2">Stock Disponible: {sneakerDetail.available_quantity}</h3>


                    </div>
                    {/* AÑADIR CARRITO */}
                    <Link to= "/updateProduct">
                    <button
                      
                      className="mt-10 flex  w-full items-center justify-center rounded-md border border-transparent bg-lime-500	 py-3 px-8 text-base font-medium text-white hover:bg-lime-400 focus:outline-none  "
                    >
                      Modificar
                    </button>

                    </Link>

                    <button
                     onClick={() => borrarProducto()}
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Borrar
                    </button>


                    {/* </form> */}
                  </div>

                  <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                    {/* Description and details */}
                    <div className="mt-10">
                      <h3 className="text-4xl font-semibold text-indigo-600">Detalles:</h3>

                      <div className="mt-4">
                        <ul className="space-y-2 pl-4 text-sm list-none">

                          <li className="text-gray-400">
                            <span className="text-gray-900 text-xl font-medium">Marca: {sneakerDetail.brand}</span>
                          </li>
                          <li className="text-gray-400">
                            <span className="text-gray-900 text-xl font-medium">Genero: {sneakerDetail.gender}</span>
                          </li>
                          <li className="text-gray-400">
                            <span className="text-gray-900 text-xl font-medium">Condicion: {sneakerDetail.condition}</span>
                          </li>
                          <li className="text-gray-400">
                            <span className="text-gray-900 text-xl font-medium">Edad: {sneakerDetail.age_group}</span>
                          </li>
                          <li className="text-gray-400">
                            <span className="text-gray-900 text-xl font-medium">Material Externo: {sneakerDetail.externalMaterial}</span>
                          </li>
                          <br />
                          <li className="text-gray-400">
                            <span className="text-gray-900 text-xl font-medium">Color: {
                              sneakerDetail.colors.map(e => <h3>{e.toUpperCase()}</h3>)
                            }
                            </span>
                          </li>
                          <br />
                          {sneakerDetail.visible === 1 && <li><span className="text-red-900 text-xl font-medium">
                            Este producto no puede ser visto por los clientes
                            </span></li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)

          : <Loading />
      }
    </>
  );
};

export default CardDetailAdmin;