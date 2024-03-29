import { Client, DMChannel, GuildMember, Message, MessageEmbed, MessageFlags, TextBasedChannel, TextChannel } from "discord.js";

import path from "path";

import { warn } from "./commands/warn";
import { clear } from "./commands/clear";
import { cmdecho } from "./commands/cmdecho";
import { krunker } from "./triggers/krunker";
import { loadConfig } from "./libs/configManager";
import { info } from "./commands/info";
import { send } from "./commands/send";
import { WebInterface } from "./web/WebInterface";
import { ttt } from "./commands/ttt";
import { w2g } from "./commands/w2g";
import { isTrigger, nils } from "./triggers/nils";
import { dad } from "./commands/dad";
import { face } from "./commands/face";
import { DiffieHellman } from "crypto";
import { help } from "./commands/help";

export const client = new Client();
const config = loadConfig();

client.on("ready", () => {
    client.user?.setActivity(config.bot.activity.message, {type: config.bot.activity.type});
})

client.on("message", async message => {
    if (message.content.startsWith(config.bot.prefix)) {
        let command = message.content.split(" ")[0].substr(config.bot.prefix.length);
        let args = message.cleanContent.substr(command.length + config.bot.prefix.length);

        switch (command.toLocaleLowerCase()) {
            case "cmdecho":
                cmdecho(message, command, args, config);
                break;
            case "warn":
                warn(message, command, args, config);
                break;
            case "clear":
                clear(message, command, args, config);
                break;
            case "info":
                info(message, command, args, config);
                break;
            case "send":
                send(message, command, args, config);
                break;
            case "ttt":
                ttt(message, command, args, config);
                break;
            case "w2g":
                w2g(message, command, args, config);
                break;
            case "dad":
                dad(message, command, args, config);
                break;
            case "face":
                face(message, command, args, config);
                break;
            case "help":
                help(message, command, args, config);
        }
    } else if (message.content.toLocaleLowerCase().includes("krunker.io/?game=")) {
        krunker(message, config);
    } else if (isTrigger(message.content)) {
        nils(message, config);
    }
    
    else {
        if (!message.content.includes(" ")) {

        }
    }
})

const webInterface = new WebInterface(client, 9000, config);
webInterface.start();

client.login(config.bot.token);

console.log("started.");