const server = io().connect();

const render = mensajesChat => {
	let chat = document.querySelector("#chat");
	let html = mensajesChat.map(mens => {
		return `<li>
        <strong style="color:blue"> ${mens.author.id}</strong> </strong>
        <em style="color:green"> ${mens.text} </em>
        </li>`;
	});
	chat.innerHTML = html.join("");
};

const addMessage = evt => {
	const id = document.querySelector("#mail").value;
	const nombre = document.querySelector("#nombre").value;
	const apellido = document.querySelector("#apellido").value;
	const edad = document.querySelector("#edad").value;
	const alias = document.querySelector("#alias").value;
	const avatar = document.querySelector("#avatar").value;
	const text = document.querySelector("#text").value;

	const chatText = {
		author: { id, nombre, apellido, edad, alias, avatar },
		text
	};
	// console.log(chatText);
	server.emit("mensaje-nuevo", chatText, id => {
		console.log(id);
	});

	return false;
};

server.on("mensaje-servidor", mensaje => {
	// console.log("mensaje-servidor: ", mensaje);
	render(mensaje.mensajesChat);
});