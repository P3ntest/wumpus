import { Client, Message, MessageAttachment, MessageEmbed, User } from "discord.js";
import { cairoVersion, createCanvas, loadImage } from "canvas";
import { load } from "yamljs";
import path from "path";

export async function user(message: Message, command: string, args: string, config: any) {
    let member = message.member;
    if (message.mentions.members)
        member = message.mentions.members.first(1)[0] ?? "";

    let canvas = createCanvas(700, 250);
    let ctx = canvas.getContext("2d");
    
    // let background = await loadImage(path.join(__dirname, "../../images/bg001.png"));
    // ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#777";//"#7289da";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let profileHeight = 180;
    let avatarSpacing = (canvas.height - profileHeight) / 2;

    let tagSize = 50;
    let roleSize = 30;

    let textPadding = 10;
    let textSpacing = (canvas.height - textPadding - tagSize - roleSize) / 2;

    ctx.fillStyle = "#ffffff";
    ctx.font = tagSize + "px 'Arial Black'";
    ctx.fillText(member?.user.tag ?? "", profileHeight + avatarSpacing * 2, textSpacing + tagSize,
    canvas.width - avatarSpacing * 3 + profileHeight);
    
    ctx.fillStyle = member?.roles.highest.hexColor ?? "";
    ctx.font = roleSize + "px 'Arial Black'";
    ctx.fillText(member?.roles.highest.name ?? "", 
        profileHeight + avatarSpacing * 2, 
        textSpacing + tagSize + textPadding + roleSize);

    ctx.beginPath();
    ctx.arc(profileHeight / 2 + avatarSpacing, profileHeight / 2 + avatarSpacing,
        profileHeight / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(avatarSpacing, avatarSpacing, profileHeight, profileHeight);

    let profile = await loadImage(member?.user.displayAvatarURL({format: "png"}) ?? "");
    ctx.drawImage(profile, avatarSpacing, avatarSpacing, profileHeight, profileHeight);

    let attachment = new MessageAttachment(canvas.toBuffer(), 'user-image.png');

	message.channel.send("", attachment);


}