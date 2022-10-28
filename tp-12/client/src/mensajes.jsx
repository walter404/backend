const mensajes = ({obj}) =>{
    console.log(obj)
    return (
        <div style={{display:'flex'}}>
            <img style={{width: "30px", height: '30px', margin:'1rem'}} src={obj.author.avatar} />
            <div style={{display:'flex', flexDirection:'column'}}>
                <div style={{display: 'flex'}}> 
                    <h3>{obj.author.nombre} {obj.author.apellido}</h3>
                </div>
                <h4>{obj.texto}</h4>
            </div>
        </div>
    )
}
export default mensajes
