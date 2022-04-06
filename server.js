
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
app.use(function (req , res){ 
    res.json({
    status: false, message: "ERROR 404"});
});

server.listen(config.PORT , (log) => console.log("Server running on port:" + config.PORT));

module.exports = io;

require(config.LOGIC + "/socket.js");