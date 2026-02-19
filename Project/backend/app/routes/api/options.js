import express from "express";
import { User as userController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger } from "../../utils/index.js"
import fs from "fs";
const router = express.Router();

const world = JSON.parse(
    fs.readFileSync("/src/app/dataBank/theworld.json", "utf-8")
)
function getCN(country) {
    let cn
    if (country.length === 2)
        cn = world[country];
    else {
        cn = Object.values(world).find(c => c.name === country);
    }
    return cn;
}

router.post(
    "/zipcode",
    expressRoute(
        async req => {
            let country = req.body.country;
            let cn = getCN(country);
            return {
                message: "",
                data: [{
                    pattern: (Buffer.from(cn.zipFormat, "utf-8")).toString("base64")
                }]
            }
        },
        userController
    )
)
/*

router
    .get(
        "/country",
        expressRoute(
            async req => {
                return {
                    message: "", data: Object.values(world).map(cn => ({
                        label: cn.name,
                        value: cn.codes.iso2,
                        name: cn.codes.iso2
                    }))
                }
            },
            userController
        )
    )
    .post(
        "/state",
        expressRoute(
            async req => {
                let cn = getCN(req.body.country);
                if (!cn) return { message: "", data: [] }
                let data = Object.values(cn.states).map(st => ({
                    name: st.code,
                    label: st.name,
                    value: st.code
                }))
                return {
                    message: "",
                    data
                }
            },
            userController
        )
    )
    .post(
        "/zipcode",
        expressRoute(
            async req => {
                let country = req.body.country;
                let cn = getCN(country);
                return {
                    message: "",
                    data: [{
                        pattern: (Buffer.from(cn.zipFormat, "utf-8")).toString("base64")
                    }]
                }
            },
            userController
        )
    )
    .post(
        "/city",
        expressRoute(
            async req => {
                let [cn, st] = req.body.parent.toUpperCase().split("-");

                let country = world[cn];
                let state = country?.states[st]
                let data = state?.cities?.map(ct => ({
                    name: ct,
                    label: ct,
                    value: ct
                }))
                return {
                    message: "",
                    data
                }
            },
            userController
        )
    )
    //*/
export default router;