import {API} from "./index.js";

async function getMailer(category, type, data,headers) {
    const mailerAPI = new API({
        baseURL: `http://api-email-template:8080`,
        headers
    })
    return await mailerAPI.post(`/api/v1/mailer/${category}/${type}`, data);

}
export default getMailer;