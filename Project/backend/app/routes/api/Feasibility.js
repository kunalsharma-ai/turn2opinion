import express from "express";
import { User as userController, Answer as answerController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, getMailer, sendMail, Token } from "../../utils/index.js"

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";
            let data = await userController.list()
            return { message, data:data.length };
        },
        userController
    ))
    .post(expressRoute(
        async req => {
            // Read all entries matching filter
            let message = "";
            let filters=Object.fromEntries(Object.entries(req.body).map(fltr=>{
                if(fltr[1] instanceof Array)return fltr;
                if(fltr[0]==="Country"){
                    return ["country",Object.keys(fltr[1])]
                }
                return [fltr[0],Object.keys(fltr[1])]
            }))
            if("Age" in filters){
                let temp=filters.Age.map(age=>{
                    let start=new Date("0000-01-01")
                    let end=new Date("0000-12-31")
                    let today=new Date();
                    end.setFullYear(today.getFullYear() - age.min )
                    start.setFullYear(today.getFullYear() - age.max )
                    return {dob:{
                        $gt:start,
                        $lt:end
                    }}
                })
                delete(filters.Age);
                filters["$or"]=temp;
            }
            let data = await answerController.feasibility(filters)
            return { message, data:data.length };
        },
        answerController
    ))

export default router;