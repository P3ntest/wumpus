import { Message, MessageEmbed, TextChannel } from "discord.js";
import fetch from "node-fetch";

export async function w2g(message: Message, command: string, args: string, config: any) {
  const preload = args.trim() || "https://www.youtube.com/watch?v=zD8O536WZhk";

  

  const room = await fetch("https://w2g.tv/rooms/create.json", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "w2g_api_key": config.w2g,
      "share": preload,
      "bg_color": "#181818",
      "bg_opacity": "100"
    })
  })
    .then(response => response.json())

  const roomLink = "https://w2g.tv/rooms/" + room.streamkey;

  const embed = new MessageEmbed().setColor("facd3b").setTitle("Here is your w2g room!").setURL(roomLink).setFooter("Created by Wumpus with ♡").setDescription(roomLink);
  message.channel.send(embed);
  // console.log("W2G: Here is your room! \n https://w2g.tv/rooms/" + data.streamkey);

}