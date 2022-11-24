import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProductPost } from "../../Redux/actions";
import style from "../CreateProduct/CreateProduct.module.css";
// Previsualizar
import ModalPrevisualizar from "../CreateProduct/ModalPrevisualizar/ModalPrevisualizar";

const UpdateProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sneakerDetail = useSelector((state) => state.detail);
  console.log(sneakerDetail)
  // para validaciones:
  const [error, setError] = useState({});
  const initialState = {
    id: sneakerDetail.id,
    thumbnail:sneakerDetail.pictures ? sneakerDetail.pictures[0]:"",
    localThumbnailInput: "",
    title: sneakerDetail.title,
    price: sneakerDetail.price,
    condition: sneakerDetail.condition ? sneakerDetail.condition :"",
    picture: "",
    pictures: sneakerDetail.pictures,
    age_group: sneakerDetail.age_group,
    brand: sneakerDetail.brand,
    color: "",
    colors: sneakerDetail.colors,
    externalMaterial: sneakerDetail.externalMaterial,
    shoeStyle: sneakerDetail.shoeStyle? sneakerDetail.shoeStyle:"Zapatilla",
    size: "",
    sizes: sneakerDetail.sizes,
    imgInput: 0,
    laImg: 0,
    iLocalPictures: [],
    genero: sneakerDetail.genero,
    available_quantity: sneakerDetail.available_quantity
  };

  // ESTADO PRINCIPAL
  const [input, setInput] = useState(initialState);
  // PREVISUALIZAR
  const [ModalPrev, setModalPrev] = useState(false)
  // ABRIR MODAL
  const handleOpenModal = (e) => {
    e.preventDefault();
    setModalPrev(true)
  }

  const handleRenderChangeLocal = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      imgInput: true,
    });
  };
  const LocalRender = () => {
    return (
      <div>
        <button className={style.btnImg} onClick={(e) => handleRenderChangeURL(e)}>Subir con URL</button>

        {EditSesionUrl()}
      </div>
    );
  };

  const handleRenderChangeURL = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      imgInput: false,
    });
  };

  const URLRender = () => {
    return (
      <div>
        <button className={style.btnImgLocal} onClick={(e) => handleRenderChangeLocal(e)}>
          Subir img local
        </button>

        <input
          type="text"
          value={input.thumbnail}
          className={style.field}
          title="thumbnail"
          onChange={(e) => handleChange(e)}
        />
      </div>
    );
  };

  const RenderizadoBotones = () => {
    return (
      <div>
        <button className={style.btnImgLocal} onClick={(e) => handleRenderChangeLocal(e)}>
          Subir img local
        </button>

        <button className={style.btnImg} onClick={(e) => handleRenderChangeURL(e)}>Subir con URL</button>
      </div>
    );
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.title]: e.target.value,
    });
    // Validacion:
    //     setError(
    //         validate({
    //             ...input,
    //             [e.target.name]: e.target.value,
    //         })
    //     );
    // }
  };
  // Funcion para Convertir numero en String y agregar "AR"
  const handleChangesizes = (e) => {
    e.preventDefault();
    let numerosizes = e.target.value;
    let numeroString = numerosizes.toString() + " AR";

    setInput({
      ...input,
      sizes: numeroString,
    });
  };

  // AGE_GROUP
  const handleSelect = (e) => {
    setInput({
      ...input,
      age_group: e.target.value,
    });
  };
  const handleSelectCondition = (e) => {
    setInput({
      ...input,
      condition: e.target.value,
    });
  };

  const handleSelectGenero = (e) => {
    setInput({
      ...input,
      genero: e.target.value,
    });
  };

  // ELIMINAR URL Picture
  const handleDelete = (el) => {
    setInput({
      ...input,
      pictures: input.pictures.filter((name) => name !== el),
    });
  };

  //ELIMAR ARRAY COLOR
  const handleDeleteColor = (el) => {
    setInput({
      ...input,
      colors: input.colors.filter((name) => name !== el),
    });
  };

  //ELIMAR SIZES
  const handleDeleteSizes = (el) => {
    setInput({
      ...input,
      sizes: input.sizes.filter((name) => name !== el),
    });
  };

  // AÑADIR URL Pictures
  const hundlePictureAdd = (e) => {
    e.preventDefault();

    input.pictures.push(input.picture);
    setInput({
      ...input,
      picture: "",
    });
  };

  // AÑADIR URL colors
  const hundleColorsAdd = (e) => {
    e.preventDefault();
    input.colors.push(input.color);
    setInput({
      ...input,
      color: "",
    });
  };
  // AÑADIR URL colors
  const hundleSizesAdd = (e) => {
    e.preventDefault();
    input.sizes.push(input.size);
    setInput({
      ...input,
      size: "",
    });
  };

  //  FUNCION PARA CREAR PRODUCTO
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.thumbnail &&
      input.title &&
      input.price &&
      input.condition &&
      input.pictures &&
      input.age_group &&
      input.brand &&
      input.colors &&
      input.externalMaterial &&
      input.shoeStyle &&
      input.sizes
    ) {
      dispatch(
        UpdateProductPost({
          id: input.id,
          thumbnail: input.thumbnail,
          title: input.title,
          price: input.price,
          condition: input.condition,
          pictures: [input.thumbnail, ...input.pictures],
          age_group: input.age_group,
          brand: input.brand,
          colors: input.colors,
          externalMaterial: input.externalMaterial,
          shoeStyle: input.shoeStyle,
          sizes: input.sizes,
          available_quantity: input.available_quantity
        })
      );
      swal({
        title: "Product created successfully!",
        icon: "success",
        button: "Ok",
      });
      setInput(initialState);
      history.push(`/sneakerAdmin/${sneakerDetail.id}`);
    } else alert(" missing data for the update of a new product");
  };

  const [images, setimages] = useState("");

  useEffect(() => {
    setInput({
      ...input,
      thumbnail: images
    })

  }, [images]);

  const EditSesionUrl = () => {
    const changeInput = async (e) => {

      let newImgsToState = readmultifiles(e);
      console.log(newImgsToState)
      let thumbnail = await uploadImgLocal(newImgsToState)
      console.log(thumbnail)
      setimages(thumbnail[0]);
    };

    function readmultifiles(e, indexInicial) {
      const files = e.currentTarget.files;

      const arrayImages = [];

      Object.keys(files).forEach((i) => {
        const file = files[i];

        let url = URL.createObjectURL(file);

        //console.log(file);
        arrayImages.push({
          index: indexInicial,
          name: file.name,
          url,
          file,
        });

        indexInicial++;
      });

      return arrayImages;
    }

    function deleteImg(e) {
      //console.log("borrar img " + indice);
      e.preventDefault();
      setimages("");
    }

    return (
      <div className="container-fluid">
        <br></br>
        {/* INPUT IMAGES */}
        <label className={style.imgSelect}>
          <span>Seleccionar archivos </span>
          <input hidden type="file" multiple onChange={changeInput}></input>
        </label>

        {/* VIEW IMAGES */}
        {images ? (
          <div className="row">
            <div className="col-6 col-sm-4 col-lg-3 square">
              <div className="content_img">
                <button
                  className="position-absolute btn btn-danger"
                  onClick={(e) => deleteImg(e)}
                >
                  x
                </button>
                {console.log(images)}
                <img
                  alt="algo"
                  src={images}

                  data-toggle="modal"
                  data-target="#ModalPreViewImg"
                  className="img-responsive"
                ></img>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    setInput({
      ...input,
      pictures: pictures
    })
  }, [pictures]);
  const EditSesionLocal = () => {
    const changeInput = async (e) => {
      //esto es el indice que se le dará a cada imagen, a partir del indice de la ultima foto
      let indexImg;

      if (pictures.length > 0) {
        indexImg = pictures[pictures.length - 1].index + 1;
      } else {
        indexImg = 0;
      }

      let newImgsToState = readmultifiles(e, indexImg);
      let pictures2 = await uploadImgLocal(newImgsToState)
      console.log(pictures2[0])

      if (input.thumbnail && pictures2[0]) {
        if (pictures[0] !== input.thumbnail) {
          pictures2.unshift(input.thumbnail);
        }
      }
      let newImgsState2 = pictures.concat(pictures2)

      setPictures(newImgsState2);

      console.log(newImgsState2);
    };

    function readmultifiles(e, indexInicial) {
      const files = e.currentTarget.files;

      const arrayImages = [];

      Object.keys(files).forEach((i) => {
        const file = files[i];

        let url = URL.createObjectURL(file);

        arrayImages.push({
          index: indexInicial,
          name: file.name,
          url,
          file,
        });

        indexInicial++;
      });

      return arrayImages;
    }

    function deleteImg(indice) {
      const newImgs = pictures.filter(function (element) {
        return element.index !== indice;
      });
      setPictures(newImgs);
    }

    return (
      <div className="container-fluid">
        <br></br>
        {/* INPUT IMAGES */}
        <label className={style.imgSelect}>
          <span>Seleccionar archivos </span>
          <input hidden type="file" multiple onChange={changeInput}></input>
        </label>

        {/* VIEW IMAGES */}
        <div className="row">
          {pictures.map((pictures) => (
            <div
              className="col-6 col-sm-4 col-lg-3 square"
              key={pictures.index}
            >
              <div className="content_img">
                <button
                  className="position-absolute btn btn-danger"
                  onClick={deleteImg.bind(this, pictures.index)}
                >
                  x
                </button>
                {console.log(pictures)}
                <img
                  alt={pictures}
                  src={pictures}
                  data-toggle="modal"
                  data-target="#ModalPreViewImg"
                  className="img-responsive"
                ></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const RenderizadoBotonesPictures = () => {
    return (
      <div>
        <button className={style.btnImgLocal} onClick={(e) => handleRenderChangeLocalPictures(e)}>
          Subir img local
        </button>

        <button className={style.btnImg} onClick={(e) => handleRenderChangeURLPictures(e)}>
          Subir con URL
        </button>
      </div>
    );
  };

  const handleRenderChangeLocalPictures = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      laImg: true,
    });
  };

  const handleRenderChangeURLPictures = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      laImg: false,
    });
  };

  const LocalRenderPictures = () => {
    return (
      <div>
        <button className={style.btnImg} onClick={(e) => handleRenderChangeURLPictures(e)}>
          Subir con URL
        </button>
        {EditSesionLocal()}
      </div>
    );
  };

  const URLRenderPictures = () => {
    return (
      <div>
        <button className={style.btnImgLocal} onClick={(e) => handleRenderChangeLocalPictures(e)}>
          {" "}
          Subir img local{" "}
        </button>
        <input
          type="text"
          value={input.picture.url}
          className={style.field}
          title="picture"
          onChange={(e) => handleChange(e)}
        />
        <button className={style.btnImg} onClick={(e) => hundlePictureAdd(e)}> Añadir imagen</button>
      </div>
    );
  };

  const [thumbnail2, setThumbnail2] = useState("");
  useEffect(() => {

  }, [thumbnail2]);


  const [localPictures, setLocalPictures] = useState([]);

  useEffect(() => {
    setInput({
      ...input,
      iLocalPictures: localPictures,
    });
  }, [localPictures]);

  const uploadImgLocal = async (files) => {
    let archivos = files.length - 1;
    let urls = [];
    while (archivos > -1) {
      const data = new FormData();
      data.append("file", files[archivos]?.file);
      data.append("upload_preset", "images");

      const upload = await fetch(
        "https://api.cloudinary.com/v1_1/dvh8g0fcw/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const file = await upload.json();
      console.log(upload);
      console.log(file.secure_url);
      urls.push(file.secure_url);
      archivos = archivos - 1;
    }
    return urls;
  };


  // --------------------------------------------------------------------------------------------
  // COMPONENTE RENDER
  return (
    <div className={style.containerMain}>
      {console.log("Errores", error)}
      <form className={style.form}>
        <h2 className={style.titulo}>Product Update</h2>
        {/* Previsualizar */}
        <button className={style.btnPrev} onClick={(e) => handleOpenModal(e)}>Previsualizar</button>
        {
          ModalPrev &&
          <ModalPrevisualizar
            title={input.title}
            picture={input.thumbnail}
            price={input.price}
            setModalPrev={setModalPrev}
            brand={input.brand}
            gender={input.genero}
            condition={input.condition}
            externalMaterial={input.externalMaterial}
            age_group={input.age_group}
            // Carrousel
            pictures={input.pictures}
            colors={input.colors}
            sizes={input.sizes}

          />
        }

        {/* TITLE */}
        <div>
          <p>Title:</p>

          <input
            type="text"
            value={input.title}
            className={style.field}
            title="title"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* PRICE */}
        <div>
          <p>Price: </p>

          <input
            type="number"
            min="0"
            step="25"
            className={style.field}
            value={input.price}
            title="price"
            onChange={handleChange}
          />
        </div>
        {/* THUMBNAIL */}
        <div>
          <div>
            <p>Img:</p>

            {input.imgInput === 0 && <RenderizadoBotones />}
            {input.imgInput === true && <LocalRender />}
            {input.imgInput === false && <URLRender />}
          </div>
          {/* BRAND */}
          <div>
            <p>Brand:</p>

            <input
              type="text"
              value={input.brand}
              className={style.field}
              title="brand"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        {/* colors */}
        <div>
          <p>colors:</p>

          <input
            type="text"
            value={input.color}
            className={style.field}
            title="color"
            onChange={(e) => handleChange(e)}
          />
          <button className={style.btnImg} onClick={(e) => hundleColorsAdd(e)}> Añadir color</button>
        </div>
        {/* ARRAY COLORS  */}
        <div className={style.pictures}>
          {input.colors?.map(
            (
              el //cada vez que coloquemos una opcion se creara una pequeña lista
            ) => (
              <div key={el} className={style.containArray}>
                <p>{el}</p>
                <button
                  className={style.btnX}
                  onClick={() => handleDeleteColor(el)}
                >
                  X
                </button>
              </div>
            )
          )}
        </div>

        {/* EXTERNALMATERIAAL */}
        <div>
          <p>Material Del Exterior: </p>

          <input
            type="text"
            value={input.externalMaterial}
            className={style.field}
            title="externalMaterial"
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* SIZES */}
        <div>
          <p>sizes: </p>
          <input
            type="text"
            value={input.size}
            className={style.field}
            title="size"
            onChange={(e) => handleChange(e)}
          />
          <button className={style.btnImg} onClick={(e) => hundleSizesAdd(e)}> Añadir size</button>
        </div>
        {/* ARRAY SIZES  */}
        <div className={style.pictures}>
          {input.sizes?.map(
            (
              el //cada vez que coloquemos una opcion se creara una pequeña lista
            ) => (
              <div key={el} className={style.containArray}>
                <p>{el}</p>
                <button
                  className={style.btnX}
                  onClick={() => handleDeleteSizes(el)}
                >
                  X
                </button>
              </div>
            )
          )}
        </div>

        {/* CONDITION */}
        <div className={style.select}>
          
          {!input.condition && ( // si hay un error hara un <p> nuevo con el error
            <p className={style.error}>{"choose a Condition"}</p>
          )}
          <p>Select Condition:</p>
          <select className={style.select} onChange={(e) => handleSelectCondition(e)}>
            <option selected disabled>
              Select Condition
            </option>
            <option value="Nuevo">Nuevo</option>
            <option value="Usado">Usado</option>
          </select>
        </div>

        {/* GENERO */}
        <div className={style.select}>
          {!input.genero&& ( // si hay un error hara un <p> nuevo con el error
            <p className={style.error}>{"choose a genero"}</p>
          )}
          <p>Select genero:</p>
          <select className={style.select} onChange={(e) => handleSelectGenero(e)}>
            <option selected disabled>
              Select genero
            </option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        {/* AGE_GROUP */}
        <div className={style.select}>
          {/* {input.age_group && ( // si hay un error hara un <p> nuevo con el error
            <p className={style.error}>{"choose a age_group"}</p>
          )} */}
          <p>Select age_group Group:</p>
          <select className={style.select} onChange={(e) => handleSelect(e)}>
            <option selected disabled>
              Select age_group Group
            </option>
            <option value="Adultos">Adultos</option>
            <option value="Niños">Niños</option>
          </select>
        </div>

        {/* PICTURES */}
        <div>
          <p>Imagenes Adicionales:</p>
          {/* {error.title && ( // si hay un error hara un <p> nuevo con el error
                        <p className={style.error}>{error.title}</p>
                    )} */}

          {input.laImg === 0 && <RenderizadoBotonesPictures />}
          {input.laImg === true && <LocalRenderPictures />}
          {input.laImg === false && <URLRenderPictures />}



          {/* ARRAY PICTURES  */}
          <div className={style.pictures}>
            {input.pictures?.map(
              (
                el //cada vez que coloquemos una opcion se creara una pequeña lista
              ) => (
                <div key={el} className={style.divName}>
                  <p>{el}</p>
                  <button
                    className={style.btnX}
                    onClick={() => handleDelete(el)}
                  >
                    X
                  </button>
                </div>
              )
            )}
          </div>
        </div>
        {/* BUTTON */}
        {
          <button
            className={style.submit}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Update Product
          </button>
        }
      </form>
    </div>
  );
};

export default UpdateProduct;
