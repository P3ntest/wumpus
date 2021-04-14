import { Message, MessageEmbed, TextChannel } from "discord.js";
import { mkdirSync } from "fs";
import { measureMemory } from "vm";
import fetch from "node-fetch";

export async function dad(message: Message, command: string, args: string, config: any) {
  const joke = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
  
  message.channel.send(":joy: " + joke.joke);
}