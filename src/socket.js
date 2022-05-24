module.exports = (io) => {
	let draws = [];
	let users = 0;
	io.on("connection", (socket) => {
		draws.forEach((draw) => {
			if (draws != null) {
				io.emit("show_drawing", draw);
			}
		});
		users += 1;
		io.emit("users", users);
		socket.on("delete", () => {
			draws = [];
			io.emit("show_drawing", null);
		});
		socket.on("drawing", (data) => {
			draws.push(data);
			io.emit("show_drawing", data);
		});
		socket.on("disconnect", () => {
			users -= 1;
			io.emit("users", users);
		});
	});
};
