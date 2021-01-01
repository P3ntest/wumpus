import { Client } from "discord.js";
import express from "express";
import path from "path";
import session from "express-session";
import randomstring from "randomstring";

export class WebInterface {
    client: Client;
    app;
    port: number;
    config;

    constructor(client: Client, port: number, config) {
        this.client = client;
        this.app = express();
        this.port = port;
        this.config = config;

        this.app.use(express.static(path.join(__dirname, "../../web/public")));
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../../web/templates'));
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(session({
            secret: "k2L0av3j",
            resave: false,
            saveUninitialized: true
        }));

        this.addRoutes();
    }

    addRoutes() {
        this.app.get("/", (req, res) => {
            console.log(req.session["authorized"])
            if (!req.session["authorized"]) {
                res.render("login.ejs", {});
            } else {
                res.send("logged in ez");
            }
        });

        this.app.post("/", (req, res) => {
            if (req.body.password == this.config.web.password) {
                req.session["authorized"] = "yes";
            }
            res.redirect("/");
        });
    }

    start() {
        this.app.listen(this.port, console.error);
    }

}