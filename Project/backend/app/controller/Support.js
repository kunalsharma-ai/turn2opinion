import { CrudController } from "../utils/index.js";
import { SupportTicket, SupportActions, SupportComment } from "../model/index.js";

class SupportCommentController extends CrudController { 
    async list(query = {}, populateFields = null, sort = {},project=null){
        let commonFilters=super.commonFilters;
        let list=await SupportComment.find({...query,...commonFilters}).select("+created.By +created.From").populate("created.By","name fullName email")
        console.log({list})
        return list
    }
}

class SupportController extends CrudController {
    #comments
    constructor(model) {
        super(model)
        this.#comments = new SupportCommentController(SupportComment);
    }
    async reply(ticket, data) {
        if (ticket.status !== data.status) {
            await super.update(ticket._id, {
                status: data.status
            })
        }
        this.#comments.request = this.request;
        return await this.#comments.create({
            ticketNo: ticket.ticketNo,
            message: data.message,
            attachments: data.attachments,
            type: "reply"
        })
    }
    async conversation(ticket) {
        this.#comments.request = this.request;
        return this.#comments.list({ ticketNo: ticket.ticketNo },null,{
            _id:-1
        });
    }
}

export default new SupportController(SupportTicket);

