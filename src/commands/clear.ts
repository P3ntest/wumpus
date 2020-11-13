import { Message, MessageEmbed, TextChannel } from "discord.js";

export function clear(message: Message, command: string, args: string, config: any) {
    if (message.channel instanceof TextChannel) {
        if (!config.ids.owners.includes(message.author.id))
            return;

        if (Number.parseInt(args.trim()) != undefined) {
            let textChannel: TextChannel = message.channel;
            textChannel.bulkDelete(Number.parseInt(args.trim()) + 1);
            message.channel.send(new MessageEmbed().setColor(config.messages.info.color).setDescription(":no_entry_sign:  Deleted " + args + " messages!"))
            .then(msg => msg.delete({timeout: 1700}));
        }
    }
}