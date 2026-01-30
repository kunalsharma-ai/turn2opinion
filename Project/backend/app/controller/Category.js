import { CrudController, Mutate } from "../utils/index.js";
import { Category as categoryModel } from "../model/index.js";
class Category extends CrudController {
    fixUserIssue(){
        super.request={
            ...this.request,
            user:{
                _id:null
            }
        }
    }
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        return await super.list(query, populateFields, sort, project)
    }
    async create(data){
        let item=await super.list(data);
        if(item.length!==0)throw new Error(`Category ${data.name} already exists`);
        this.fixUserIssue();
        return await super.create(data)
    }
    async update(id,data){
        this.fixUserIssue();
        return await super.update(id,data);
    }
    async read(id) {
        return await super.read(id)
    }
    async delete(id){
        this.fixUserIssue();
        return await super.delete(id);
    }
}

export default new Category(categoryModel)