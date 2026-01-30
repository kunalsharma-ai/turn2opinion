import {exec} from "child_process";
import fs from "fs";

function seconds(n) {
    if (!typeof n === "number") throw new Error("Number Required")
    return 1000 * Number(n);
}

function minutes(n) {
    if (!typeof n === "number") throw new Error("Number Required")
    return seconds(60) * Number(n);
}

function hours(n) {
    if (!typeof n === "number") throw new Error("Number Required")
    return minutes(60) * Number(n);
}

function days(n) {
    if (!typeof n === "number") throw new Error("Number Required")
    return hours(24) * Number(n);
}

function weeks(n) {
    if (!typeof n === "number") throw new Error("Number Required")
    return days(7) * Number(n);
}

class fsLogger {
    #path;
    #timezone;
    #locale

    async createFile(path) {
        /*
        if (fs.existsSync(path))
            await this.Archive();
        //*/
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, "", "utf-8");
        }
    }

    #write(message) {
        if (typeof message !== "string") throw new Error("Invalid log expression.");
        fs.appendFileSync(this.#path, message, "utf-8");
    }

    constructor(path, {locale = "en-US", timezone = "UTC"}) {
        this.#path = path;
        this.#locale = locale;
        this.#timezone = timezone;
        this.createFile(path);
        setInterval(async () => {
            await this.createFile(path)
        }, weeks(1))
    }

    set Locale(locale) {
        this.#locale = locale;
    }

    set Timezone(timezone) {
        this.#timezone = timezone
    }

    get Date() {
        const now = new Date();
        const Formatter = new Intl.DateTimeFormat(
            this.#locale,
            {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: this.#timezone,
                timeZoneName: "short",
                hour12: false,
            }
        )
        return Formatter.format(now);
    }

    Archive() {
        return new Promise((resolve, reject) => {
            exec(`tar -cJf  ${this.#path}-$(date +%Y-%m-%d-%H%M%S).tar.xz ${this.#path}; rm -f ${this.#path}`, (err, stdout, stderr) => {
                if (err) reject(err);
                resolve(stdout)
            })
        })
    }

    Log(message = "", object = {}) {
        let output = `\n\n[${this.Date}]: ${message}`
        if (object && (Object.keys(object).length > 0 || (object instanceof Array))) output += `\n${JSON.stringify(object, null, 4)}`
        console.log(output);
        this.#write(output);
    }
}

export default new fsLogger("app/logs/activities", {
    locale: "en-IN",
    timezone: "IST"
})