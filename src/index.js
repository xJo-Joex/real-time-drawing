const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const cors = require('cors')

const server = http.createServer(app);
const io = socketio(server)
require("./socket")(io);

app.set("port", process.env.PORT);
//middlewares

app.use(express.static(path.join(__dirname, "/public")));
app.use(cors())

server.listen(app.get("port"), () => {
	console.log("Servidor conectado");
});
