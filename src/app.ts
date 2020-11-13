import { Client, DMChannel, GuildMember, Message, MessageEmbed, MessageFlags, TextBasedChannel, TextChannel } from "discord.js";
import * as YAML from "yamljs";
import path from "path";
import arg from "arg";

import { warn } from "./commands/warn";
import { clear } from "./commands/clear";

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
                message.reply(new MessageEmbed()
                .setTitle("Command Message Echo")
                .setDescription("Echos the typed command back.")
                .setColor(config.messages.info.color)
                .addField("\u200b", "\u200b")
                .addField("Message Content", message.cleanContent)
                .addField("Command", command ? command : "", true)
                .addField("Arguments", args ? args : "n.a.", true));
                break;
            case "warn":
                warn(message, command, args, config);
            case "clear":
                clear(message, command, args, config);
                break;
        }
    }
})



client.login(config.bot.token);