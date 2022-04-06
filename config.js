/* Base Config */
const config = { 
    URL: "https://infinity-dungeon.glitch.com", 
    PORT: process.env.PORT || 8081, //port
    DIRNAME: __dirname, //root folder
    DB: __dirname + "/database", //database
    LOGIC: __dirname + "/logic", //logic 
    TOKEN: { 
        secret: "super_secret_token_keyword", 
        expire: "6h" 
    }, 
    APPTOKEN: "La_6362kwjsbd&uwu-_-eb27+7291", 
    SERVER: { version: "v0.0.1" }
 }; 
 
 module.exports = config;