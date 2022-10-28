import Comments from "./Layout/Comments";
import Products from "./Layout/Products";
import Home from './Layout/Home'
import Nav from "./Layout/Nav";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./Layout/Cart";
import RutaProtegida from "./rutaProtegida";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useRequest from './hooks/useRequest';

function App() {
  const home = (useLocation().pathname === '/');
  const user = useSelector((state) => state.administrador.user);
  const { doSend: doCheck, errors: errorsLogin } = useRequest({
    url: "/api/user",
    method: "get",
    onSuccess: (usr) => {
        dispatch(setCredentials(usr))
    }
});
  useEffect(()=>{
    doCheck()
  },[])
  console.log('la locacion es ', home)
  return (
    <div className="App">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
        <Nav home />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="carrito/:userId" element={<RutaProtegida user={user}><Cart /></RutaProtegida>} />
        </Routes>
      </div>
      {/*<Comments home className={home && "hidden "} /> */}
    </div>
  );
}

export default App;
