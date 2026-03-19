import fs from "fs"

import { CrudController, fsLogger, Mutate } from "../utils/index.js";
import { Option as modelOption } from "../model/index.js";

class Option extends CrudController {
    fixUserIssue() {
        super.request = {
            ...this.request,
            user: {
                _id: null
            }
        }
    }
    constructor(model) {
        let instance = super(model)
            instance.request={
            origin:"mho.sampledge.duckdns.org",
            user:{
            }
        }
    
        // this.loadDefaults();
        return instance;
    }
    async loadDefaults() {
        let files=fs.readdirSync("/data/options");
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
            const file = `/data/options/${files[fileIndex]}`;
            let data = JSON.parse(fs.readFileSync(file, "utf-8"))
            console.log({
                file,
                data:data.length
            })
            for (let index = 0; index < data.length; index++) {
                try {
                    await super.create(data[index]);
                } catch (error) {
                    console.log(index,"unable to add,"+error.message)
                }
            }
            console.log(`Loaded.`)
        }
        console.log(files);
        return;
        
    }
    async list(q = {}, populateFields = null, sort = {}, project = "+sortOrder") {
        let query=Object.fromEntries(Object.entries(q).map(fltr=>{
            if(fltr[1] instanceof Array){
                return [
                    fltr[0],
                    {$in:fltr[1]}
                ]
            }
            return fltr;
        }))

        // console.log({query})
        return await super.list(query, populateFields, sort, project)
    }
    async create(data) {
        let item = await super.list(data);
        if (item.length !== 0) throw new Error(`Survey ${data.name} already exists`);
        this.fixUserIssue();
        return await super.create(data)
    }
    async update(id, data) {
        this.fixUserIssue();
        return await super.update(id, data);
    }
    async read(id) {
        return await super.read(id)
    }
    async delete(id) {
        this.fixUserIssue();
        return await super.delete(id);
    }
    async summary(){
        let temp=Mutate(await modelOption.aggregate([
            {
                $group:{
                    _id:"$question",
                    count:{
                        $sum:1
                    }
                }
            }
        ])).reduce((a,c)=>{
            a[c._id]=c.count;
            return a;
        },{})
        return temp;
    }
}


export default new Option(modelOption);
