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
    
    
};