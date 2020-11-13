import { Client, DMChannel, GuildMember, Message, MessageEmbed, MessageFlags, TextChannel } from "discord.js";
import * as YAML from "yamljs";
import path from "path";
import arg from "arg";
import { sign } from "crypto";

const client = new Client();
const config = YAML.load(path.resolve(__dirname, "config.yaml"));

client.on("ready", () => {
    client.user?.setActivity("TypeScript Tutorials", {type: "WATCHING"});
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
                .setColor("#7c76e0")
                .addField("\u200b", "\u200b")
                .addField("Message Content", message.cleanContent)
                .addField("Command", command ? command : "", true)
                .addField("Arguments", args ? args : "n.a.", true));
                break;
            case "warn":
                if (!config.ids.owners.includes(message.author.id))
                    return;
                if (message.channel instanceof TextChannel) {
                    let parsed = arg({
                        "-c": String, //The channel
                        "-m": String, //The message
                        "-h": Boolean, //Hide who warned
                    }, {permissive: true, argv: args.split(" ")});
                    if (message.mentions.members?.size == 0) {
                        message.reply(new MessageEmbed().setColor("#ff0000").setDescription("Please specify a Member!"));
                        return;
                    }

                    if (message.mentions.members?.first(1)[0] == null) {
                        message.reply(new MessageEmbed().setColor("#ff0000").setDescription("An internal error occured."));
                        return;
                    }

                    let warnedMember: GuildMember | null = message.mentions.members?.first(1)[0];

                    let embed = new MessageEmbed().setColor("#7c76e0").setTitle("\u200b").setTimestamp();

                    let channel: TextChannel;

                    embed.setAuthor(warnedMember.user.tag + " has been warned", warnedMember.user.avatarURL() ?? "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg");
                    
                    embed.addField("Reason", parsed["-m"] ? parsed["-m"].replace("_", " ") : "Inappropiate Behavior", true);

                    if (!parsed["-h"])
                        embed.setFooter(message.author.tag, message.author.avatarURL() ?? "");

                    embed.addField("Level", ":a:", true);

                    embed.setImage("https://raw.githubusercontent.com/P3ntest/wumpus/main/images/warning.png");

                    if (parsed["-c"])
                        channel = message.mentions.channels.first(1)[0];
                    else
                        channel = message.channel;

                    channel.send(embed);

                    message.delete();

                } else {
                    message.reply(new MessageEmbed().setColor("#ff0000").setDescription("This only works in servers."));
                }
            case "":
                break;
            default:
                break;
        }
    }
})



client.login(config.bot.token);