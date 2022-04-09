/******************
 * On Socket Load *
 ******************/

const config = require("../../config.js");
const DB = require(config.LOGIC + "/helper/DB.js");

const load = (io , socket , id) => {
    const firstEnter = DB.getUserValue(id ,"firstEnter");
    if(firstEnter) {
        return socket.emit("firstEnter" , true);
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
        if(!nick || !_class) return socket.emit("setNickClass" , "WRONG_DATA");
        if(!nick) return socket.emit("setNickClass" , "EMPTY_NICK");
        if(nick.length < 4) return socket.emit("setNickClass" , "SHORT_NICK");
        const char = /^[a-zA-Z0-9]+$/;
        if(!char.test(nick)) return socket.emit("setNickClass" , "WRONG_NICK");
        if(DB.findUserByNick(nick)) return socket.emit("setNickClass" , "NICK_USED");
        const classes = config.CLASSES;
        if(!classes.includes(_class)) return socket.emit("setNickClass" , "WRONG_CLASS");
        
        DB.setUserValue("class" , _class);
        return socket.emit("setNickClass" , true);
    });
};