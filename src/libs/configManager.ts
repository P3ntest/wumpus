import { fstat } from "fs";
import path from "path";
import * as YAML from "yamljs";
import fs from "fs";


export function loadConfig() {
    let pathToDistConfig = path.join(__dirname, "../config.yaml");

    if (!fs.existsSync(pathToDistConfig)) {
        fs.copyFileSync(path.join(__dirname, "../../src/config.yaml"), pathToDistConfig);
    }

    let config = YAML.load(path.resolve(__dirname, "config.yaml"));

    if (config.bot.token.length < 10) {
        console.error("No Token set in ./dist/config.yaml. Exiting");
        process.exit(1);
    }

    return YAML.load(path.resolve(__dirname, "config.yaml"));
}