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

const client = new Client();
const config = loadConfig();

client.on("ready", () => {
    client.user?.setActivity(config.bot.activity.message, {type: config.bot.activity.type});
})

client.on("message", message => {
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
        }
    } else if (message.content.toLocaleLowerCase().includes("krunker.io/?game=")) {
        krunker(message, config);
    } else {
        if (!message.content.includes(" ")) {

        }
    }
})

const webInterface = new WebInterface(client, 9000, config);
webInterface.start();

client.login(config.bot.token);