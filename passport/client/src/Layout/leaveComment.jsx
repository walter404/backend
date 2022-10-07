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
    <section className="bg-white/25  rounded-2xl">
      <div className="p-4 lg:py-4 px-4 mx-auto max-w-screen-md">
        <h4 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contanos Tu experiencia
        </h4>
        
        <form action="#" name="form" className="space-y-8">
          <div>
            <label
              htmlFor="nombre"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Decinos tu nombre
            </label>
            <input
              type="nombre"
              id="nombre"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Figeroa Alcorta"
              onChange={(e) => setNombre(e.currentTarget.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="titulo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Titulo del comentario
            </label>
            <input
              type="titulo"
              id="titulo"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Que es lo que pensas?"
              onChange={(e) => setTitulo(e.currentTarget.value)}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="comentario"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Explayate a gusto
            </label>
            <textarea
              id="comentario"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              onChange={(e) => setComentario(e.currentTarget.value)}
              placeholder="Mis adidas. son lo mas!"
            ></textarea>
          </div>
          <button
            type="button"
            className=" py-3 px-5 text-sm font-bold text-center text-blue-600 rounded-lg bg-gray-300  hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300  w-full "
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
