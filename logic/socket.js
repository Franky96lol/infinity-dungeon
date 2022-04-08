const config = require("../config.js");
const io = require(config.DIRNAME + "/server.js");

io.on("connection" , (socket) => {
    console.log(socket);
});

module.exports = true;