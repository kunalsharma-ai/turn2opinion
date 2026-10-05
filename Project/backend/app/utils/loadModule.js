import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export default async function loadModule(name) {

    const modulePath = path.join( "/src", name);
    try {
        await fs.access(modulePath);
        const module = await import(modulePath);

        if (typeof module.default === "function") {
            await module.default();
        }

        console.log(`Loaded module: ${name}`);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.log(`Module not installed: ${name}`);
            return;
        }

        throw err;
    }
}
