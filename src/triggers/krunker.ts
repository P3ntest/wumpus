import { Message, MessageEmbed, TextChannel } from "discord.js";

export function krunker(message: Message, config: any) {
    let krunkerCode = message.content.split("krunker.io/?game=")[1].split(" ")[0].trim();
    let krunkerUrl = "https://krunker.io/?game=" + krunkerCode;

    let embed = new MessageEmbed()
    .setColor(config.messages.krunker.color)
    .setTitle(message.author.username + " invited you to play Krunker!")
    .setURL(krunkerUrl)
    .setAuthor("Krunker", "https://krunker.games/assets/cache_image/krunker-io_200x200_3cf.png", "https://krunker.io")
    .setDescription("Play krunker.io with **" + message.author.username + "**!")
    .addField("Game Link", krunkerUrl, true)
    .addField("Game ID", krunkerCode, true)
    .setImage("https://krunker.io/img/logo_1.png")
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL() ?? "")
    .setThumbnail(message.author.avatarURL() ?? "");

    message.reply(embed);

    message.delete();
}