const config = require("../config.js");
const io = require(config.DIRNAME + "/server.js");
const auth = require(config.LOGIC + "/auth/authenticator.js");
const DB = require(config.LOGIC + "/helpers/DB.js");

io.on("connection" , (socket) => {
    const token = socket.handshake.query.token;
    if(!token) return socket.disconnect();
    
    const id = auth.verify(token);
    if(!id) return socket.disconnect();
    
    if(!DB.findUserById(id)) return socket.disconnect();
    
    io.sockets[id] = socket;
});

module.exports = true;