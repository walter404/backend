import Comments from "./Layout/Comments";
import Products from "./Layout/Products";
import Home from './Layout/Home'
import Nav from "./Layout/Nav";
import { Routes, Route, useLocation } from "react-router-dom";
import Cart from "./Layout/Cart";
function App() {
  const home =( useLocation().pathname === '/');
  console.log('la locacion es ', home)
  return (
    <div className="App">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50">
        <Nav home />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Products />} />
          <Route path="carrito/:userId" element={<Cart />} />
        </Routes>
      </div>
      <Comments home className={home && "hidden "} />
    </div>
  );
}

export default App;
