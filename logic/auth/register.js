const config = require("../../config.js");
const uid = require(config.LOGIC + "/helpers/uid.js");
const bcrypt = require("bcryptjs");
const DB = require(config.LOGIC + "/helpers/DB.js");

/* Funtion register
* @params req{ body : {username , email , password , rpassword , token}}
* @params res {}
*/

const register = async (req , res) => {
  
    let username,
    email,
    password,
    rpassword;
  
    try {
        const body = req.body;
        username = (body.username ? body.username : undefined);
        email = (body.email ? body.email : undefined);
        password = (body.password ? body.password : undefined);
        rpassword = (body.rpassword ? body.rpassword : undefined);
    } catch (err) {
        return res.json({
            status: false,
            data: "DATA_ERROR"
        });
    }
  
    if (!username) {
        return res.json({
            status: false,
            data: "EMPTY_USER"
        });
    }

    if (!email) {
        return res.json({
            status: false, 
            data: "EMPTY_MAIL"
        });
    }

    if (!password) {
        return res.json({
            status: false,
            data: "EMPTY_PASS"
        });
    }
  
    if (!validateEmail(email)) {
        return res.json({
            status: false,
            data: "WRONG_MAIL"
        });
    }
  
    if(DB.findUserByName(username)) return res.json({ status : false , data : "ACC_USE"});
    if(DB.findUserByMail(email)) return res.json({ status: false , data : "MAIL_USE"});
    
    const char = /^[a-zA-Z0-9]+$/;
    if (!char.test(username)) {
        return res.json({
            status: false,
            data: "USERNAME_BAD_CHAR"
        });
    }
    
    if (password.length < 8) {
        return res.json({
            status: false,
            data: "PASS_LENGTH"
        });
    }

    if (password != rpassword) {
        return res.json({
            status: false,
            data: "PASS_MATCH"
        });
    }
  
    const account = {
        id: "",
        username: "",
        nickname: "",
        email: "",
        password: "",
        guild: "",
        level: 1,
        xp: 0,
        pos : config.PSTART,
        class : "",
        gold: 0,
        gems: 0,
        color: "",
        friend: {
            list: [],
            request: [],
            invites: []
        },
        mails: [],
        bags : 1,
        armory: [],
        consumables : [],
        materials: [],
        spells : [],
        skins : ["basic_male" , "basic_female"],
        status : {
            hp : 0,
            mp : 0,
            pbuff : [],
            nbuff : []
        },
        attributes: {
            points: 0,
            hp : 0,
            mp : 0,
            str : 0,
            agi : 0,
            int : 0,
            luck : 0
        },
        equiped: {
            first_hand: {id :"na" , upg : 0},
            second_hand: {id : "na", upg : 0},
            shoulders: {id : "na", upg : 0},
            neck: {id : "na", upg : 0},
            trinket: {id : "na", upg : 0},
            chest: {id : "na", upg : 0},
            gloves: {id : "na", upg : 0},
            ring: {id : "na", upg : 0},
            bracers: {id : "na", upg : 0},
            boots: {id : "na", upg : 0},
            mount: {id : "na" , upg : 0}
        },
        skin : "basic_male_1",
        chats : {
            global : ["global",
            "system","comerce"],
            party : "",
            guild : "",
            zone : "",
            privates : []
        },
        firstEnter: true,
        isOnline: false,
        lastTimeOnline: new Date().getTime(),
        isOnCombat: false,
        isOnMenu: false,
        isOnChat: false,
        isTrading: false,
        suscribed: false,
        verified: false,
        acclevel: 1 //0 = baneado , 1 = usuario regular , 2 = maestro , 3 = moderador , 4 = admin
    };
    
    account.id = uid.alphanum(8);
    account.username = username;
    account.nickname = "pj" + uid.num(6);
    account.email = email;
    account.password = bcrypt.hashSync(password, 10);
  
    try {
        DB.addUser(account.id , account);
        
        const nodemailer = require("nodemailer");
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "fireshoot.dev@gmail.com",
                pass: "hnm4Pz9h"
            }
        });

        const message = {
            from: "Infinity-Dungeon Team.",
            to: email,
            subject: "Verificaci??n de Cuenta.",
            text:
            "Para verificar su cuenta siga el siguiente link:\n" +
            config.URL +
            "/auth/verify/" +
            account.id
        };

        transport.sendMail(message, function(err, info) {
            if (err) {} else {}
        });

        return res.json({
            status: true,
            data: "REGISTERED"
        });
        
     }catch (err) {
        console.log(err);
        return res.json({
            status: false,
            data:
            "DATA_ERROR",
            error: err
        });

    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = register;