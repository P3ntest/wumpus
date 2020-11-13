import { Message, MessageEmbed, TextChannel } from "discord.js";

export function cmdecho(message: Message, command: string, args: string, config: any) {
    message.reply(new MessageEmbed()
    .setTitle("Command Message Echo")
    .setDescription("Echos the typed command back.")
    .setColor(config.messages.info.color)
    .addField("\u200b", "\u200b")
    .addField("Message Content", message.cleanContent)
    .addField("Command", command ? command : "", true)
    .addField("Arguments", args ? args : "n.a.", true));
}