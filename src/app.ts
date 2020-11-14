import { Client, DMChannel, GuildMember, Message, MessageEmbed, MessageFlags, TextBasedChannel, TextChannel } from "discord.js";
import * as YAML from "yamljs";
import path from "path";
import arg from "arg";

import { warn } from "./commands/warn";
import { clear } from "./commands/clear";
import { cmdecho } from "./commands/cmdecho";
import { krunker } from "./triggers/krunker";
import { compileFunction } from "vm";

const client = new Client();

const config = YAML.load(path.resolve(__dirname, "config.yaml"));

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
        }
    } else if (message.content.toLocaleLowerCase().includes("krunker.io/?game=")) {
        krunker(message, config);
    }
})



client.login(config.bot.token);