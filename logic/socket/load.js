/******************
 * On Socket Load *
 ******************/

const config = require("../../config.js");
const DB = require(config.LOGIC + "/helper/DB.js");

const load = (io , socket , id) => {
    const firstEnter = DB.getUserValue(id ,"firstEnter");
    if(firstEnter) {
        socket.emit("firstEnter" , true);
    }
    
    socket.on("verify_nick" , (nick) => {
        if(!nick) return socket.emit("verify_nick" , "EMPTY_NICK");
        if(nick.length < 4) return socket.emit("verify_nick" , "SHORT_NICK");
        const char = /^[a-zA-Z0-9]+$/;
        if(!char.test(nick)) return socket.emit("verify_nick" , "WRONG_NICK");
        if(DB.findUserByNick(nick)) return socket.emit("verify_nick" , "NICK_USED");
        return socket.emit("verify_nick" , "NICK_GOOD");
    });
    
    socket.on("setNickClass" , (nick , _class) => {
        if(!nick || !_class) return socket.emit("setNickClass" , false);
        
    });
};