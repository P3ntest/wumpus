import arg from "arg";
import { GuildMember, Message, MessageEmbed, TextChannel } from "discord.js";

export function warn(message: Message, command: string, args: string, config: any) {
    if (!config.ids.owners.includes(message.author.id))
                    return;
                if (message.channel instanceof TextChannel) {
                    let parsed = arg({
                        "-c": String, //The channel
                        "-m": String, //The message
                        "-h": Boolean, //Hide who warned
                    }, {permissive: true, argv: args.split(" ")});
                    if (message.mentions.members?.size == 0) {
                        message.reply(new MessageEmbed().setColor("#ff0000").setDescription("Please specify a Member!")).then(errorMessage => {
                            errorMessage.delete({timeout: 1700});
                        });
                        message.delete();
                        return;
                    }

                    if (message.mentions.members?.first(1)[0] == null) {
                        message.reply(new MessageEmbed().setColor("#ff0000").setDescription("An error occured")).then(errorMessage => {
                            errorMessage.delete({timeout: 1700});
                        });
                        message.delete();
                        return;
                    }

                    let warnedMember: GuildMember | null = message.mentions.members?.first(1)[0];

                    let embed = new MessageEmbed().setColor(config.messages.warn.color).setTitle("\u200b").setTimestamp();

                    embed.setThumbnail("https://raw.githubusercontent.com/P3ntest/wumpus/main/images/warning.png");

                    let channel: TextChannel;

                    embed.setAuthor(warnedMember.user.tag + " has been warned", warnedMember.user.avatarURL() ?? "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg");
                    
                    embed.addField("Reason", parsed["-m"] ? parsed["-m"].replace("_", " ") : "Inappropiate Behavior", true);

                    if (!parsed["-h"])
                        embed.setFooter(message.author.tag, message.author.avatarURL() ?? "");

                    embed.addField("Level", ":a:", true);

                    if (parsed["-c"])
                        channel = message.mentions.channels.first(1)[0];
                    else
                        channel = message.channel;

                    channel.send(embed);

                    if (!parsed["-c"])
                        message.delete();

                } else {
                    message.reply(new MessageEmbed().setColor("#ff0000").setDescription("This only works in servers."));
                }    
}