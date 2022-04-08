/********************
* Database Manager  *
*********************/

const fs = require("fs");
const config = require("../../config.js");

var DB = {
    users: {},

    loadUsers: function () {
        console.time("Users loaded in:")
        const _users = fs.readdirSync(config.DB + "/users/");
        try {
            for (let u of _users) {
                this.users[u.split(".")[0]] = JSON.parse(fs.readFileSync(config.DB + "/users/" + u));
            }
        }catch(err) {
            console.error(err);
        }
        console.timeEnd("Users loaded in:");
    },

    saveUsers: async function() {
        console.time("Users saved in:");
        for (let u in this.users) {
            await fs.writeFile(config.DB + "/users/" + u + ".json", JSON.stringify(this.users[u]), ()=> {});
        }
    },
    
    autoSave: function(time) {
        setInterval(this.saveUsers , time);
    },

    addUser: function(id , data) {
        if (!this.users[id]) {
            this.users[id] = data;
            return true;
        } else return false;
    },

    delUser: function(id) {
        if (!this.users[id]) {
            delete this.users[id];
            return true;
        } else return false;
    },

    findUserById: function(id) {
        if (this.users[id]) return this.users[id];
        else return false;
    },

    findUserByName: function(user) {
        for (let u in this.users) {
            if (this.users[u].username == user) {
                return this.users[u];
            }
        }
        return false;
    },

    findUserByNick: function(nick) {
        for (let u in this.users) {
            if (this.users[u].nick == nick) {
                return this.users[u];
            }
        }
        return false;
    },

    findUserByMail: function(mail) {
        for (let u in this.users) {
            if (this.users[u].email == mail) {
                return this.users[u];
            }
        }
        return false;
    },

    findAll: function(key , condition , value) {
        let f = [];
        for (let u in this.users) {
            switch(condition){
                case "==":
                    if(this.users[u][key] == value) f.push(this.users[u]);
                    return f;
                    break;
                case "!=":
                    if(this.users[u][key] != value) f.push(this.users[u]);
                    return f;
                    break;
                case "<":
                    if(this.users[u][key] < value) f.push(this.users[u]);
                    return f;
                    break;
                case ">":
                    if(this.users[u][key] > value) f.push(this.users[u]);
                    return f;
                    break;
                case "<=":
                    if(this.users[u][key] <= value) f.push(this.users[u]);
                    return f;
                    break;
                case ">=":
                    if(this.users[u][key] >= value) f.push(this.users[u]);
                    return f;
                    break;
                default:
                    f.push(this.users[u]);
                    return f;
                    break;
            }
        }
        return f;
    },

    setValue: function(id , key , value) {
        if (this.users[id]) {
            this.users[id][key] = value;
            return true;
        } else return false;
    },

    addValue: function(id , key , value) {
        if (this.users[id]) {
            this.users[id][key] += value;
            return true;
        } else return false;
    }

};

module.exports = DB;