import { Client } from "discord.js";
import express from "express";
import path from "path";

export class WebInterface {
    client: Client;
    app;
    port: number;

    constructor(client: Client, port: number) {
        this.client = client;
        this.app = express();
        this.port = port;

        this.app.use(express.static(path.join(__dirname, "../src/web/public")));
    }

    start() {
        this.app.listen(this.port);
    }

}