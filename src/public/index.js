const socket = io();
let click = false;
let moving_mouse = false;
let x_position = 0;
let y_position = 0;
let prev_position = null;
let color = "black";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const users = document.getElementById("users");

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.addEventListener("mousedown", () => {
	click = true;
});

canvas.addEventListener("mouseup", () => {
	click = false;
});

canvas.addEventListener("mousemove", (e) => {
	x_position = e.clientX;
	y_position = e.clientY;
	moving_mouse = true;
});

function change_color(c) {
	color = c;
	context.strokeStyle = color;
	context.stroke();
}

function create_drawing() {
	if (click && moving_mouse && prev_position != null) {
		let drawing = {
			x_position,
			y_position,
			color,
			prev_position: prev_position,
		};
		socket.emit("drawing", drawing);
	}
	prev_position = { x_position, y_position };
	setTimeout(create_drawing, 25);
}
socket.on("show_drawing", (drawing) => {
	if (drawing !== null) {
		context.beginPath();
		context.lineWidth = 5;
		context.strokeStyle = drawing.color;
		context.moveTo(drawing.x_position, drawing.y_position);
		context.lineTo(drawing.prev_position.x_position, drawing.prev_position.y_position);
		context.stroke();
	} else {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}
});

create_drawing();

function delete_all() {
	socket.emit("delete");
}
socket.on('users', (number)=>{
  users.innerHTML=`Número de usuarios conectados: ${number}`
})