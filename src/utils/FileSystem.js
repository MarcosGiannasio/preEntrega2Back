import fs from "fs";
import path from "path";
import paths from "./paths.js";

export default class FileSystem {
    #filepath;

    constructor (filename) {
        this.#filepath = path.join(paths.files, filename);
    }

    read = async () => {
        const contentJSON = await fs.promises.readFile(this.#filepath, "utf8") || "[]";
        const content = JSON.parse(contentJSON);
        return content;
    };

    write = async (content) => {
        if (!content) throw new Error("No has enviado contenido");

        const contentJSON = JSON.stringify(content, null, "\t");
        return await fs.promises.writeFile(this.#filepath, contentJSON);
    };
}