import fs from "fs";
function cartesian(...arrays) {
    return arrays.reduce(
        (result, array) =>
            result.flatMap(x =>
                array.map(y => [...x, y])
            ),
        [[]]
    );
}
class Feasibility {
    #distribution = []
    #population = {}
    constructor(basepath = ".") {
        try {
            // console.log(fs.readdirSync(basepath));
            this.#distribution = JSON.parse(fs.readFileSync(`${basepath}/distribution.json`, "utf-8"));
            this.#population = JSON.parse(fs.readFileSync(`${basepath}/population.json`, "utf-8"));
        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }
    getWeight(country, field, value) {
        let temp = this.#distribution.find(
            info =>
                info.country === country
                && info.fld === field
                && info.value === value
        )
        if (!temp) return 0;
        return temp.weight;
    }
    getOptions(country, field) {
        console.log(country,field)
        return this
            .#distribution
            .filter(
                info =>
                    info.country === country
                    && info.fld === field
            )
            .map(
                val => ({
                    label: val.value, value: val.value
                })
            )
    }
    calculate(country, filter) {
        return Object
            .entries(filter)
            .map(v => this
                .getWeight(country, v[0], v[1]))
            .reduce((a, c) => a * c, 1)
    }
    feasibility(country, filters) {
        let population = this.#population[country];
        const entries = Object.entries(filters);

        const combinations = cartesian(
            ...entries.map(([field, values]) =>
                values.map(value => ({ field, value }))
            )
        );

        let count = combinations
            .map(combination => {
                const filter = Object.fromEntries(
                    combination.map(({ field, value }) => [field, value])
                );
                return this.calculate(country, filter)
            })
            .reduce(
                (a, c) => {
                    a += population * c
                    return a;
                },
                0
            )
        return Math.round(count);
    }
}
export default Feasibility;
// ; (async () => {
//     let db = new Feasibility()
//     console.log(db.feasibility(
//         "IN",
//         {
//             gender: [
//                 "Female"
//             ],
//             children: [
//                 "0-2 Years"
//             ],
//             education: [
//                 "Some college - no degree"
//             ],
//             ethnicity: [
//                 "Dravidian"
//             ]
//         }
//     ))
// })()