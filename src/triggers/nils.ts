import { Message, MessageEmbed, TextChannel } from "discord.js";

const { getMatchInformation } = require("krunker-api");

export const triggers = [
  "im",
  "i am",
  "i'm",
  "i' m",
  "i 'm",
  "bin"
]

export function isTrigger(content) {
  for (let trigger of triggers) {
    if (content.toLowerCase().includes(trigger)) {
      return true;
    }
  }

  return false;
}

function getTrigger(content) {
  for (let trigger of triggers) {
    if (content.toLowerCase().includes(trigger)) {
      return trigger;
    }
  }
}

export function nils(message: Message, config: any) {
  if (!message.author.bot)
  message.channel.send("Hey " + message.content.toLowerCase().split(getTrigger(message.content))[1].trim() + ", ich bin <@414457857682178050>");
}
