import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLocalStorage from "../useLocalStorage/useLocalstorage";


const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.currentUser);
  const [usuario, saveUser] = useLocalStorage("USUARIO", " ");

  const handleCheckout = () => {
    saveUser(user)

    axios
      .post("http://localhost:3001/checkout", { cartItems })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  
  return (
    <>
   
      {user ? (
        <button
          className="px-10 py-2 mt-2 text-xl text-white bg-blue-600 rounded-lg"
          onClick={handleCheckout}
        >
          Comprar
        </button>
      ) : (
        <Link to="/">
          <button className="px-10 py-2 mt-2 text-xl text-white bg-blue-600 rounded-lg">
            Inicia sesion para comprar
          </button>
        </Link>
      )}
    </>
  );
};

export default PayButton;
