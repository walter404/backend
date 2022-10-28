import Comment from "./Comment";
import LeaveComment from "./leaveComment";
import { useId } from "react";
import { useState, useEffect } from "react";
import useSocket from "../hooks/useSockect";

const Comments = ({home}) => {
    const [comments, setComments] = useState([]);
    const {isConnected, received} = useSocket({
        listen: 'comentarios',
    })
    useEffect(() => {
        if(isConnected && received!=[]){
            setComments(received[0])        
        }
    }, [received])
    const id = useId();
    if(comments.length === 0){
        return <div>Cargando...</div>
    }
    return (
        <footer className={home && "hidden" || "bg-gradient-to-r from-sky-400 to-blue-500 p-5 d-flex grid gap-4 grid-cols-2 static inset-x-0 bottom-0"}>
            <div className="p-5 d-flex grid gap-2 grid-cols-2 static inset-x-0 bottom-0 ">
            {comments.map((obj,index)=>{
                return (
                    <Comment key={`${id}-${index}`} titulo={obj.titulo} fecha={obj.fecha} nombre={obj.nombre} comentario={obj.comentario} />
                )          
            })}
            </div>
            <LeaveComment />
        </footer>
    )
}
export default Comments;