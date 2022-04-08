
/*****************
 * Server Config *
 *****************/
 
const config = require("./config.js");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const router = require(config.LOGIC + "/router.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const DB = require(config.LOGIC + "/helper/DB.js");

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

/* Express router */
app.use("/", router);
// Wakeup route
app.post("/wakeup", (req, res) => {
    res.json({
        status: true
    });
});
//Error route
app.use((req , res) => { 
    res.json({
    status: false, message: "ERROR 404"});
});

DB.loadUsers();

server.listen(config.PORT , (log) => console.log("Server running on port:" + config.PORT));

module.exports = io;

require(config.LOGIC + "/socket.js");

DB.autoSave(60 * 1000);