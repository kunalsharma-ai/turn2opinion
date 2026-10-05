import fs from "fs";

(() => {
    let data = Object.values(JSON.parse(fs.readFileSync("./app/dataBank/theworld.json", "utf-8"))).map(v => ({
        name: v.name,
        code: v.codes.iso2,
        tz: v.timezones.reduce((a, c) => {
            a[c.zoneName] = c.gmtOffset;
            return a;
        }, {})
    }))
    fs.writeFileSync("./app/dataBank/timezones",JSON.stringify(data,null,2),"utf8")

})();