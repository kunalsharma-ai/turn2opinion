import { SurveyProject } from "../model/index.js";
import {
    Mutate,
    CrudController,
    sendMail,
    getMailer
} from "../utils/index.js";
function Exit(message) {
    throw new Error(message);
}

class Controller extends CrudController {
    async list(query, populateFields = null, sort = {}, project = null) {
        return super.list(query, populateFields, sort, project)
    }
    async create(projectInfo) {
        
        let temp = {
            pid: projectInfo.project,
            name: projectInfo.name,
            note: projectInfo.note,
            source: "sampledge",
            markets: Mutate(projectInfo).markets.map(market => ({
                marketID: market._id,
                country: market.country,
                filters: Object.entries(market.filters).map(filter => ({
                    type: filter[0],
                    value: filter[1]
                })),
                cpi: market.cpi,
                loi: market.loi,
                ir: market.ir,
                completes: market.completes,
                schedule:market.schedule,
                softLaunch:market.softLaunch,
                links:market.links
            }))
        }
        return await super.create(temp)
    }
    // async update(id, data) {
    //     let project = await super.read(id);
    //     if (!project) Exit("Project is not setup with the panel. Please check launch setup and try again.")
    //     if ("markets" in data) {
    //         let markets = project.markets;
    //         for (let i = 0; i < markets.length; i++) {
    //             const market = markets[i];
    //             const inputMarket=data.markets.find(mkt=>market.marketID===mkt._id);
    //             if(!inputMarket)continue;
    //             market.loi = inputMarket.loi ?? market.loi;
    //             market.ir = inputMarket.ir ?? market.ir;
    //             market.completes = inputMarket.completes ?? market.completes;
    //             market.cpi = inputMarket.cpi ?? market.cpi;
    //             market.schedule=inputMarket.schedule;
    //             market.filters = market.filters.map(filter => {
    //                 if (filter.type in inputMarket.filters) return ({
    //                     type: filter.type,
    //                     value: inputMarket.filters[filter.type]
    //                 })
    //                 return filter
    //             })
    //             markets[i] = market;
    //         }
    //         project.markets = markets;
    //     }
    //     if ("status" in data) {
    //         project.status = data.status;
    //     }
    //     if ("name" in data) {
    //         project.name = data.name
    //     }
    //     if ("note" in data) {
    //         project.note = data.note
    //     }
    //     return await project.save();
    // }
    async delete(id) {
        // Check number of invites
        // Check number of clicks
        // if number of invites & number of clicks is zero delete project
        Exit("Under Development")
    }
    async scheduledLaunch(id, schedule) {
        if (!("markets" in schedule)) Exit("Unable to process the request. Please check inputs and try again.");
        let project = await super.read(id);
        if (!project) Exit("Project is not setup with the panel. Please check launch setup and try again.")
        let markets = project.markets;
        for (let i = 0; i < markets.length; i++) {
            const market = markets[i];
            if (market.marketID in schedule.markets)
                market.schedule = {
                    start: schedule.markets[marketID].start,
                    frequency: schedule.markets[marketID].frequency,
                    batchSize: schedule.markets[marketID].batchSize,
                }
            markets[i] = market;
        }
        project.markets = markets;
        return await project.save();
    }
    async softLaunch(id, data) {
        // checking if data has markets
        if (!("markets" in data)) Exit("Unable to process the request. Please check inputs and try again.");
        let project = await super.read(id);
        if (!project) Exit("Project is not setup with the panel. Please check launch setup and try again.")
        let markets = project.markets;
        for (let i = 0; i < markets.length; i++) {
            const market = markets[i];
            if (market.marketID in data.markets)
                market.softLaunch = {
                    enabled: true,
                    completes: data.markets[market.marketID].completes
                }
            markets[i] = market;
        }
        project.markets = markets;
        // todo: Filter Respondents
        // todo: define selection criteria for soft launch invites
        return await project.save();
    }
    async updateCPI(data) {
        Exit("Under Deveopment");
    }
    async close(id) {
        Exit("Under Development")
    }
}

export default new Controller(SurveyProject)