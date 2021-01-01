import { Message } from "discord.js";

export function send(message: Message, command: string, args: string, config: any) {
    if (!config.ids.owners.includes(message.author.id))
        return;
    
    message.mentions.channels.first(1)[0].send(message.content.split("-")[1]);

}