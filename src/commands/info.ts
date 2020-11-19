import { Client, Message, MessageAttachment, MessageEmbed, User } from "discord.js";

const timestampFromSnowflake = (id: number) => {
    return ((id / 4194304) + 1420070400000);
};

export async function info(message: Message, command: string, args: string, config: any) {
    let member = message.member;
    if (message.mentions.members && message.mentions.members.size > 0)
        member = message.mentions.members.first(1)[0] ?? "";
    
    let embed = new MessageEmbed().setColor("#7c76e0").setTimestamp()
        .setThumbnail(member?.user?.avatarURL() ?? "")
        .setTitle(member?.user.username + "'s Info Card")
        .addField("Tag", member?.user.tag, true)
        .addField("Nickname", member?.nickname ?? "none", true)
        .addField("Joined At", member?.joinedAt?.toDateString(), true);

	message.channel.send(embed);


}