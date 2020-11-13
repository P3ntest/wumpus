import { Client, Message, MessageEmbed } from "discord.js";
import * as YAML from "yamljs";
import path from "path";
import { copyFile } from "fs";

const client = new Client();
const config = YAML.load(path.resolve(__dirname, "config.yaml"));

client.on("ready", () => {
    client.user?.setActivity("TypeScript Tutorials", {type: "WATCHING"});
})

client.on("message", message => {
    if (message.content.startsWith(config.bot.prefix)) {
        let command = message.content.split(" ")[0].substr(config.bot.prefix.length);
        let args = message.content.substr(command.length + config.bot.prefix.length);

        switch (command.toLocaleLowerCase()) {
            case "cmdecho":
                message.reply(new MessageEmbed()
                .setTitle("Command Message Echo")
                .setDescription("Echos the typed command back.")
                .setColor("#7c76e0")
                .addField("\u200b", "\u200b")
                .addField("Command", command ? command : "", true)
                .addField("Arguments", args ? args : "n.a.", true));
                break;
            case "":
                break;
            default:
                break;
        }
    }
})



client.login(config.bot.token);