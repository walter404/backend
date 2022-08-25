import { useState } from "react";
import useSocket from "../hooks/useSockect";
import DrawnerForm from "./DrawnerForm";

const Nav = () => {
  const { isConnected } = useSocket({});
  const [open, setOpen] = useState(false);
  const handlerOpen = () => {
    setOpen(!open);
  } 
  return (
    <>
    {open && <DrawnerForm  open={open}/>}
    <nav >
      <div >
        <h1 >
          Calzados Stomp
        </h1>
        <div >
        <button
          type="button" 
        >
          {isConnected ? "Conectado" : "Desconectado"}
        </button>
        <button
          onClick={handlerOpen}
        >Ingresar Producto</button>
      </div>
      </div>
    </nav>
    
    </>
  );
};
export default Nav;