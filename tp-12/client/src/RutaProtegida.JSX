import { Navigate } from "react-router-dom";

const RutaProtegida = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }  
    return children;
  };
export default RutaProtegida;