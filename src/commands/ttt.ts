import { Message, MessageAttachment } from "discord.js";
import pureimage from "pureimage";
import { Duplex, PassThrough, Readable, Stream, Writable } from "stream";
import { client } from "../app";

const fieldEmojisOld = [
    ["arrow_upper_left", "arrow_up", "arrow_upper_right"],
    ["arrow_left", "record_button", "arrow_right"],
    ["arrow_lower_left", "arrow_down", "arrow_lower_right"]
]

const fieldEmojis = [
    ["↖️", "⬆️", "↗️"],
    ["⬅️", "⏺️", "➡️"],
    ["↙️", "⬇️", "↘️"]
]

export async function ttt(message: Message, command: string, args: string, config: any) {
    const attachment = new MessageAttachment(await generateImage({}), "test.png");

    let botMessage = await message.channel.send("", attachment);

    fieldEmojis.forEach(row => {
        row.forEach(emoji => {
            botMessage.react(emoji);
        })
    });
}

const lineWidth = 4;
const fieldLength = 300;
const fieldOffset = { x: 40, y: 40 };

const oneField = fieldLength / 3;

async function generateImage(fieldData) {
    const img = pureimage.make(380, 380);
    const ctx = img.getContext('2d');

    ctx.fillStyle = '#7289da';

    for (let vert = 1; vert < 3; vert++) {
        ctx.fillRect(0 + fieldOffset.x, oneField * vert - lineWidth / 2 + fieldOffset.y, fieldLength, lineWidth);
    }

    for (let hori = 1; hori < 3; hori++) {
        ctx.fillRect(oneField * hori - lineWidth / 2 + fieldOffset.x, 0 + fieldOffset.y, lineWidth, fieldLength);
    }

    let stream = new PassThrough();

    await pureimage.encodePNGToStream(img, stream);

    return stream;
}