import { useState } from "react";
import useSocket from "../hooks/useSockect";

const LeaveComment = () => {
  const [nombre, setNombre] = useState("")
  const [titulo, setTitulo] = useState("")
  const [comentario, setComentario] = useState("")
  const {doRequest} = useSocket({
    room: 'message',
    body: {
      nombre,
      titulo,
      comentario
    },  
  });

  return (
    <section>
      <div >
        <h4 >
          Contanos Tu experiencia
        </h4>
        
        <form action="#" name="form" >
          <div>
            <label
              htmlFor="nombre"
              
            >
              Decinos tu nombre
            </label>
            <input
              type="nombre"
              id="nombre"
              placeholder="Figeroa Alcorta"
              onChange={(e) => setNombre(e.currentTarget.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="titulo"
            >
              Titulo del comentario
            </label>
            <input
              type="titulo"
              id="titulo"
              placeholder="Que es lo que pensas?"
              onChange={(e) => setTitulo(e.currentTarget.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="comentario"
            >
              Explayate a gusto
            </label>
            <textarea
              id="comentario"
              rows="6"
              onChange={(e) => setComentario(e.currentTarget.value)}
              placeholder="Mis adidas. son lo mas!"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={doRequest}
          >
            Envianos el comentario - Se parte de Adidas
          </button>
        </form>
      </div>
    </section>
  );
};

export default LeaveComment;