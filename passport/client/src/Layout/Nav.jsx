import logo from "../assets/adidas-logo.svg";
import useSocket from "../hooks/useSockect";
import useRequest from '../hooks/useRequest';
import DrawnerForm from "./DrawnerForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleAdministrador } from "../redux/AdministradorSlice";
import { toggleDrawnerCarro, addCart, initCart } from "../redux/carroSlice";
import { toggleDrawner, updateBody } from "../redux/EditorSlice";

import DrawnerCarro from "./DrawnerCarro";
import { useEffect } from "react";

const Nav = ({home}) => {
  const { isConnected } = useSocket({});
  const dispatch = useDispatch();
  const administrador = useSelector((state) => state.administrador.value);
  const userId = useSelector((state) => state.administrador.userId);
  const openDrawner = useSelector((state) => state.editor.openDrawner);
  const openDrawnerCarro = useSelector((state) => state.carro.openDrawnerCarro);
  const carrito = useSelector((state) => state.carro.carrito);

  const {doSend : doGet , errors : errorsGet} = useRequest({
    url: `/api/carro/${userId}`,
    method: "get",
    body: {},
    onSuccess: (objs) =>{ dispatch(initCart(objs))}
  });
  useEffect(()=>{
    doGet();
  },[])
  const handleNew = () => {
    dispatch(
      updateBody({
        id: null,
        producto: "",
        precio: 0,
        thumbnail: "",
        edit: false,
      })
      );
      dispatch(toggleDrawner());
    ;
    }
    const handleCarro = () => {
        dispatch(toggleDrawnerCarro());      
      }
 
  return (
    <>
      {openDrawner && <DrawnerForm open={openDrawner} />}
      {openDrawnerCarro && <DrawnerCarro carro={carrito} />}

      <nav className={home && "hidden" || "bg-white px-2 sm:px-4 py-2  mb-10 fixed w-full z-20 top-0 left-0 border-b border-gray-200"}>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <img src={logo} className="w-16 h-16 " alt="Adidas" />
          <h1 className="mx-4 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r  from-sky-600 to-blue-500">
            Adidas WebSocket
          </h1>
          <label
            htmlFor="checked-toggle"
            className="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value=""
              id="checked-toggle"
              className="sr-only peer"
              onChange={() => dispatch(toggleAdministrador())}
              checked={administrador}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Administrador
            </span>
          </label>
          <button
            className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none "
            onClick={handleCarro}
          >
           Ver Carro
          </button>
        {administrador && (
          <button
            className="text-white bg-gradient-to-r from-sky-600 to-blue-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none "
            onClick={handleNew}
          >
            Ingresar Producto
          </button>
        )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
