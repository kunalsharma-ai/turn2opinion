import express from "express";
import { ProjectLaunch as controller, Answer as answerController } from "../../controller/index.js";
import { expressRoute, expressView, isAuthenticated, fsLogger, Mutate } from "../../utils/index.js"

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // List all projects ready for launch
            let [message, data] = [
                "",
                await controller.list()
            ]
            return { message, data }
        },
        controller
    ))
    .post(expressRoute(
        async req => {
            // List all projects ready for launch matching filters provided in body
            let [message, data] = [
                "",
                await controller.list(req.body)
            ]
            return { message, data }
        },
        controller
    ))
    .put(expressRoute(
        async req => {
            const projList = await controller.list({ pid: req.body.project });
            if (projList.length === 0) {
                fsLogger.Log("Create Project Request From Sampledge", req.body);
                let [message, data] = [
                    "Created Successfully",
                    await controller.create(req.body)
                ]
                return { message, data }

            } else {
                // fsLogger.Log("Update Project Request From Sampledge", {request:req.body,available:projList});
                let project = projList[0]
                let nextVersion = req.body;
                if ("name" in nextVersion) project.name = nextVersion.name;
                if ("notes" in nextVersion) project.notes = nextVersion.notes;
                if ("status" in nextVersion) project.status = nextVersion.status;
                let markets = Mutate(project.markets);
                let reqMarkets = Mutate(req.body.markets)
                let finalMarkets = markets.map(mkt => {
                    let update = reqMarkets.find(m => m._id === mkt.marketID);
                    if (!!update) {
                        if (Boolean(update?.filters)) mkt.filters = Object.entries(update.filters).map(filter => ({
                            type: filter[0],
                            value: filter[1]
                        }));
                        if (Boolean(update?.country)) mkt.country = update.country;
                        if (Boolean(update?.loi)) mkt.loi = update.loi;
                        if (Boolean(update?.cpi)) mkt.cpi = update.cpi;
                        if (Boolean(update?.ir)) mkt.ir = update.ir;
                        if (Boolean(update?.links)) mkt.links = update.links
                        if (Boolean(update?.schedule)) mkt.schedule = update.schedule
                        if (Boolean(update?.softLaunch)) mkt.softLaunch = update.softLaunch
                    }
                    return mkt
                })
                let mktIds = markets.map(mkt => mkt.marketID);
                let remainingMarkets = reqMarkets.filter(
                    m => (!mktIds.includes(m._id))
                ).map(market => ({
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
                    schedule: market.schedule,
                    softLaunch: market.softLaunch,
                    links: market.links
                }))
                project.markets = [...finalMarkets, ...remainingMarkets];
                fsLogger.Log("Project:", project)
                let [message, data] = [
                    "Updated Successfully",
                    await controller.update(project._id, project)
                ]
                return { message, data }

            }
        },
        controller
    ))
    .patch(expressRoute(
        async req => {
            // CPI Updated
            let [message, data] = [
                "CPI Updated Successfully",
                await controller.updateCPI(req.body)
            ]
            return { message, data }
        },
        controller
    ))
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            // Read Project specifications
            let project = Mutate(await controller.read(req.params.id))
            let markets = Mutate(project.markets);
            for (let i = 0; i < markets.length; i++) {
                let market = markets[i];

                let filters = Object.fromEntries(market.filters.filter(fltr => Boolean(fltr)).map(fltr => {

                    if (fltr.value instanceof Array) return [fltr.type, fltr.value];
                    if (fltr.type === "Country") {
                        return ["country", Object.keys(fltr.value)]
                    }
                    return [fltr.type, Object.keys(fltr.value)]
                }))
                if ("Age" in filters) {
                    let temp = filters.Age.map(age => {
                        let start = new Date("0000-01-01")
                        let end = new Date("0000-12-31")
                        let today = new Date();
                        end.setFullYear(today.getFullYear() - age.min)
                        start.setFullYear(today.getFullYear() - age.max)
                        return {
                            dob: {
                                $gt: start,
                                $lt: end
                            }
                        }
                    })
                    delete (filters.Age);
                    filters["$or"] = temp;
                }
                market.qualified = await answerController.feasibility(filters)

                markets[i] = market

            }
            project.markets = markets
            console.log(project)
            let [message, data] = [
                "",
                project
            ]
            return { message, data }
        },
        controller
    ))
    .post(expressRoute(
        async req => {
            // Schedule Invites based on Inputs Provided
            // Batch Size: Number of invites per batch
            // Batch Frequency: Gap between 2 batches (Daily: 24h, Weekly: 7d, Monthly: 30d)
            let [message, data] = [
                "Scheduled Invites",
                await controller.scheduledLaunch(req.params.id, req.body)
            ]
            return { message, data }
        },
        controller
    ))
    .put(expressRoute(
        async req => {
            // Update project form source service [sampledge] using api
            let [message, data] = [
                "Updated Successfully",
                await controller.update(req.params.id, req.body)
            ]
            return { message, data }
        },
        controller
    ))
    .patch(expressRoute(
        async req => {
            // Setup Launch / Soft Launch (Configure Invite timeline) 
            // Invites = Completes Required / Normalized(Incidence Rate (IR))
            let [message, data] = [
                "Softlaunch Successful",
                await controller.softLaunch(req.params.id, req.body)
            ]
            return { message, data }
        },
        controller
    ))
    .delete(expressRoute(
        async req => {
            // Cancel A Project (Before Launch) 
            // Delete shall always return false if project has at least one invite
            let [message, data] = [
                "",
                await controller.delete(req.params.id)
            ]
            return { message, data }
        },
        controller
    ))
router
    .get("/:id/qualified", expressRoute(
        async req => {
            // Read all entries matching filter
            let message = "Applying filters";
            let project = Mutate(await controller.read(req.params.id))
            let markets = Mutate(project.markets);
            for (let i = 0; i < markets.length; i++) {
                let market = markets[i];
                let filters = Object.fromEntries(market.filters.map(fltr => {
                    if (fltr.value instanceof Array) return [fltr.type, fltr.value];
                    if (fltr.type === "Country") {
                        return ["country", Object.keys(fltr.value)]
                    }
                    return [fltr.type, Object.keys(fltr.value)]
                }))
                if ("Age" in filters) {
                    let temp = filters.Age.map(age => {
                        let start = new Date("0000-01-01")
                        let end = new Date("0000-12-31")
                        let today = new Date();
                        end.setFullYear(today.getFullYear() - age.min)
                        start.setFullYear(today.getFullYear() - age.max)
                        return {
                            dob: {
                                $gt: start,
                                $lt: end
                            }
                        }
                    })
                    delete (filters.Age);
                    filters["$or"] = temp;
                }
                market.fltr = filters
                market.data = await answerController.feasibility(filters)
                markets[i] = {
                    marketID: market.marketID,
                    data: market.data
                };

            }
            // project.markets=markets;
            return { message, data: { ...project, markets } };
        },
        answerController
    ))
export default router;