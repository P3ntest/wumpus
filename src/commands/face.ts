import { Message, MessageAttachment, MessageEmbed, TextChannel } from "discord.js";

export function face(message: Message, command: string, args: string, config: any) {
  if (args.trim().length > 0) {
    message.channel.send("<@" + message.author.id + ">, this is" + args, new MessageAttachment("https://thispersondoesnotexist.com/image", "face.png"));
    }
}