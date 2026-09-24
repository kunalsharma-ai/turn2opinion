import fs from "fs";

class JSONFile {
    load(fileName) {
        return JSON.parse(
            fs.readFileSync(
                fileName,
                "utf-8"
            )
        )
    }
    store(fileName, data) {
        fs.writeFileSync(
            fileName,
            JSON.stringify(data),
            "utf-8"
        )
    }
}
export const jsonFile = new JSONFile();

Number.prototype.toInt = function () {
    return Number(
        this.toFixed(0)
    )
}

export class CPI {
    #categoryAndLOI;
    #IRFactor;
    #LOIRange;
    #geography = [
        "DZ",
        "EG",
        "IR",
        "IL",
        "KW",
        "QA",
        "SA",
        "AE",
        "NG",
        "ZA",
        "KE"
    ]
    constructor() {
        this.#IRFactor = jsonFile.load("./app/dataBank/ir-01.json")
        this.#LOIRange = jsonFile.load("./app/dataBank/loiRange-01.json")
        this.#categoryAndLOI = jsonFile.load("./app/dataBank/categoryAndLOI.json")
    }
    irEffect(ir) {
        let factor = this.#IRFactor.find(f => f.min <= ir && f.max > ir);
        if (!factor) {
            throw new Error("Out of bound")
        }
        return factor.value;
    }
    categoryEffect(category, subcategory) {
        let factor = [];
        let temp = (category instanceof Array) ?
            category.map(cat => this.#categoryAndLOI[cat]) :
            [this.#categoryAndLOI[category]];
            console.log({
                category,subcategory
            })
        return temp.flatMap(v => {
            return ((subcategory instanceof Array) ? subcategory : [subcategory]).map(o => v.find(val => val[0].toLowerCase() === o.toLowerCase()))
        }).filter(v => Boolean(v));
    }
    getCategories(group) {
        if (!(group in this.#categoryAndLOI)) return [];
        return this.#categoryAndLOI[group].map(v => ({ label: v[0], value: v[0] }))
    }
    LOIIndex(loi) {
        let factor = this.#LOIRange.find(
            l => l.min <= loi && l.max >= loi
        )
        if (!factor || !("index" in factor)) console.log({
            loi, factor
        })
        return factor?.index;
    }
    geoFactor(country) {
        return (this.#geography.indexOf(country) > -1) ? 1.11 : 1;
    }
    calculate(
        category,
        subcategory,
        ir,
        loi,
        geography
    ) {
        const irFactor = this.irEffect(ir);
        const geoFactor = this.geoFactor(geography);
        const loiIndex = this.LOIIndex(loi);
        const categoryFactors = this.categoryEffect(category, subcategory);
        let temp = categoryFactors
            .map(categoryFactor => {
                return Math.round(irFactor * categoryFactor[1] * categoryFactor[2 + loiIndex] * geoFactor * 100) / 100
            })
            console.log(temp);
        return Math.max(...temp)
        // .max()
    }
}

export const cpi = new CPI();
