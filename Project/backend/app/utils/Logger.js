import API from "./API.js";

class Logger {
    #api;
    constructor() {
        let api = new API({ baseURL: "http://api-logs:3000/" })
        this.#api = api;
    }
    async log({
        origin,
        user = {},
        role = "",
        clientIP = "",
        remarks = "",
        category = "",
        targetObject = "",
        details = {},
        isSuccess = true
    }) {
        let temp = await this.#api.put("/api/v1/log", {
            origin,
            user,
            role,
            clientIP,
            remarks,
            category,
            targetObject,
            details,
            isSuccess
        })
        console.log(`[${(new Date()).toString()}: ${temp.status}] ${remarks}`);
    }
    async Authentication({
        origin,
        user,
        role,
        clientIP,
        remarks,
        details,
        isSuccess
    }) {
        // Login Successful
        return await this.log({
            origin,
            user,
            role,
            category: "Login",
            targetObject: `User: ${user.user}`,
            remarks,
            clientIP,
            details,
            isSuccess
        })
    }
    async AccountManagement({
        origin,
        user,
        role,
        clientIP,
        remarks,
        details,
        isSuccess
    }) {
        // Login Successful
        return await this.log({
            origin,
            user,
            role,
            category: "Account Management",
            targetObject: `User: ${user.user}`,
            remarks,
            clientIP,
            details,
            isSuccess
        })
    }
    async UserManagement({
        origin,
        user,
        role,
        clientIP,
        targetObject,
        remarks,
        details,
        isSuccess
    }) {
        return await this.log({
            origin,
            user,
            role,
            clientIP,
            category: "User Management",
            targetObject: `User: ${targetObject}`,
            remarks,
            details,
            isSuccess
        })
    }
    async RoleManagement() {

    }
    async CompanyManagement({
        origin,
        user,
        role,
        clientIP,
        company,
        remarks,
        details,
        isSuccess
    }) {
        return await this.log({
            origin,
            user,
            role,
            clientIP,
            category: "Company Management",
            targetObject: (company) ? `Company: <a href='/member/company?companyCode=${company}' target='_blank'>${company}</a>` : `Company: -`,
            remarks,
            details,
            isSuccess
        })
    }
    async BidManagement({
        origin,
        user,
        role,
        clientIP,
        bid,
        remarks,
        details,
        isSuccess
    }) {
        return await this.log({
            origin,
            user,
            role,
            clientIP,
            category: "Bid Management",
            targetObject: (bid) ? `Bid: <a href='/member/bidding/open/${bid._id}' target='_blank'>${bid.bidNo}</a>` : `Bid: -`,
            remarks,
            details,
            isSuccess
        })
    }
    async ProjectManagement({
        origin,
        user,
        role,
        clientIP,
        pid,
        projectName,
        remarks,
        details,
        isSuccess
    }) {
        return await this.log({
            origin,
            user,
            role,
            clientIP,
            category: "Project Management",
            targetObject: (pid) ? `Project: <a target="_blank" href='/member/project/open?pid=${pid}'>${pid} (${projectName})</a>` : `Project: -`,
            remarks,
            details,
            isSuccess
        })
    }
    async SettingsManagement({
        origin,
        user,
        role,
        clientIP,
        settingName,
        settingItem,
        remarks,
        details,
        isSuccess
    }) {
        return await this.log({
            origin,
            user,
            role,
            clientIP,
            category: `Settings Management`,
            targetObject: `${settingName}: ${settingItem?.name}`,
            remarks,
            details,
            isSuccess
        })
    }
    async Respondent() { }
}

export default new Logger();