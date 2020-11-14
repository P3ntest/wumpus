import { Message, MessageEmbed, TextChannel } from "discord.js";

const { getMatchInformation } = require("krunker-api");

export function krunker(message: Message, config: any) {
    let krunkerCode = message.content.split("krunker.io/?game=")[1].split(" ")[0].trim();
    let krunkerUrl = "https://krunker.io/?game=" + krunkerCode;

    let mainEmbed = new MessageEmbed()
    .setColor(config.messages.krunker.color)
    .setTitle(message.author.username + " invited you to play Krunker!")
    .setURL(krunkerUrl)
    .setAuthor("Krunker", "https://krunker.games/assets/cache_image/krunker-io_200x200_3cf.png", "https://krunker.io")
    .setDescription("Play krunker.io with **" + message.author.username + "**!")
    .addField("Game Link", krunkerUrl, true)
    .addField("Game ID", ":id: **" + krunkerCode + "**", true)
    .setImage("https://krunker.io/img/logo_1.png")
    .setFooter(message.author.tag, message.author.avatarURL() ?? "")
    .setTimestamp()
    .setThumbnail(message.author.avatarURL() ?? "");

    getMatchInformation(krunkerCode).then((match: any) => {
        let mapName: string = match.map;

        mainEmbed
        .addField("\u200b", "\u200b")
        .addField("Players", "**" + match.activePlayers + " / " + match.maxPlayers + "**", true)
        .addField("Map", mapName, true)
        .addField("Game Type", match.gameType.toUpperCase(), true);

        message.channel.send(mainEmbed);
    }).catch(() => {
        message.channel.send(mainEmbed);
    })

    message.delete();
}
