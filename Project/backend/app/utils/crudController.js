import fs from 'fs';
import mongoose from 'mongoose';
import { compare } from "./password.js"
import fsLogger from './fsLogger.js';
export default class CrudController {
    #model;
    #request;
    constructor(model) {
        this.#model = model;
    }
    get commonFilters() {
        return {
            isActive: true,
            isDeleted: false,
            origin: this.request.origin
        }
    }

    set request(req) {
        this.#request = req;
    }
    get request() {
        return this.#request;
    }
    get model() {
        return this.#model;
    }
    set model(model) {
        this.#model = model;
    }
    async seedingData() {
        try {
            const collectionName = this.#model.collection.collectionName;
            const filePath = `${process.cwd()}/seed/${collectionName}.json`;
            if (!fs.existsSync(filePath)) return;
            const data = fs.readFileSync(filePath, 'utf-8');
            const origin = this.request.origin;
            const jsonData = JSON.parse(data).map(item => {
                item.origin = origin;
                return item;
            })
            return jsonData;
        } catch (error) {
            throw new Error("Seeding error: " + error.message);

        }
    }
    async seed() {
        try {
            if (await this.count()) return;
            const jsonData = await this.seedingData();
            if (!jsonData || !jsonData.length) return;
            console.log(jsonData)         // await this.#model.insertMany(jsonData);
            for (const item of jsonData) {
                try {
                    const newItem = new this.#model(item);
                    await newItem.save();
                } catch (err) {

                }
            }
        } catch (error) {
            console.error('Error seeding database:', error);
        }
    }
    async upsert(match, upsert) {
        let temp = await this.#model.findOne(match);
        if (!temp) return await this.create(upsert);
        return await this.update(temp._id, upsert)
    }
    async create(data) {
        try {

            let temp = {
                created: {
                    By: this.request.user._id,
                    From: this.request.clientIP
                },
                ...data,
                origin: this.request.origin,
            };
            const newItem = await this.#model.create(temp);
            return newItem;
        } catch (error) {
            console.log({ data: JSON.stringify(data), error })

            throw new Error('Error creating item: ' + error.message);
        }
    }
    async read(id, populateFields = null) {
        try {
            let item
            if (!populateFields)
                item = await this.#model.findById(id);
            else
                item = await this.#model.findById(id).populate(populateFields);
            if (!item) {
                throw new Error('Item not found');
            }
            return item;
        } catch (error) {
            throw new Error('Error reading item: ' + error.message);
        }
    }

    async update(id, data) {
        try {
            const updatedItem = await this.#model.findByIdAndUpdate(id, { ...data, updated: { By: this.request.user._id, From: this.request.clientIP } }, { new: true });
            if (!updatedItem) {
                throw new Error('Item not found');
            }
            return updatedItem;
        } catch (error) {
            throw new Error('Error updating item: ' + error.message);
        }
    }
    async activate(id) {
        const activatedItem = await this.#model.findByIdAndUpdate(id, { isActive: true, updated: { By: this.request.user._id, From: this.request.clientIP } });
        if (!activatedItem) {
            throw new Error('Item not found');
        }
        return activatedItem;
    }
    async deactivate(id) {
        const deactivatedItem = await this.#model.findByIdAndUpdate(id, { isActive: false, updated: { By: this.request.user._id, From: this.request.clientIP } });
        if (!deactivatedItem) {
            throw new Error('Item not found');
        }
        return deactivatedItem;
    }
    async deleteWithPassword(id) {
        try {
            if (!this.request || !this.request.body || !this.request.body.password) throw new Error(`Password required to delete`);
            const UserModel = mongoose.models.User ?? mongoose.model("User", new mongoose.Schema({}, { collection: "User", strict: false }));
            const user = await UserModel.findById(this.request.user._id);
            if (!await compare(this.request.body.password, user.password)) throw new Error("Cannot delete, Invalid password.");
            const deletedItem = await this.#model.findByIdAndUpdate(id, { isDeleted: true, deleted: { At: new Date(), By: this.request.user._id } });
            if (!deletedItem) {
                throw new Error('Item not found');
            }
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item: ' + error.message);
        }
    }
    async delete(id) {
        try {
            const deletedItem = await this.#model.findByIdAndDelete(id);
            if (!deletedItem) {
                throw new Error('Item not found');
            }
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item: ' + error.message);
        }
    }
    async list(query = {}, populateFields = null, sort = {}, project = null) {
        try {
            let sortOrder = { _id: 1, isActive: -1, sortOrder: -1, ...sort };
            let temp = this.#model.find({
                isActive: true,
                isDeleted: false,
                ...query,
                origin: this.request.origin
            });
            
            temp = temp.sort(sortOrder);
            if (populateFields) temp = temp.populate(populateFields)
            if (!!project) temp = temp.select(project)
            let resp = await temp.exec()
            return resp;
        } catch (error) {
            throw new Error('Error listing items: ' + error.message);
        }
    }
    async count(query = {}) {
        try {
            const count = await this.#model.countDocuments({ isActive: true, isDeleted: false, ...query, origin: this.request.origin });
            return count;
        } catch (error) {
            throw new Error('Error counting items: ' + error.message);
        }
    }

    async findOne(query, populateFields = null) {
        try {
            if (!populateFields)
                return await this.#model.findOne({ isActive: true, isDeleted: false, ...query, origin: this.request.origin });
            return await this.#model.findOne({ isActive: true, isDeleted: false, ...query, origin: this.request.origin }).populate(populateFields);
        } catch (error) {
            throw new Error('Error finding item: ' + error.message);
        }
    }
    async cleanup() {
        try {
            const deletedItem = await this.#model.deleteMany({});
            if (!deletedItem) {
                throw new Error('Item not found');
            }
            return deletedItem;
        } catch (error) {
            throw new Error('Error deleting item: ' + error.message);
        }
    }
}