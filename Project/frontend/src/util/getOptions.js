import api from "./api";

const endpoints = {
    "country": "/api/v1/options/country",
    "state": "/api/v1/options/state",
    "city": "/api/v1/options/city",
    "department": "/api/v1/options/department",
    "designation": "/api/v1/options/designation",
    "zipcode": "/api/v1/options/zipcode",
    "language": "/api/v1/options/language",
    "currency": "/api/v1/options/currency",
    "service-category": "/api/v1/options/service-category",
    "services": "/api/v1/options/service",
    "project-type": "/api/v1/options/project-type",
    "industry": "/api/v1/options/industry",
    "tax": "/api/v1/options/tax",
    "client": "/api/v1/company",
    "vendor": "/api/v1/company",
    "user":"/api/v1/user",
    "roles":"/api/v1/role",
    "category":"/api/v1/category",
    "question":"/api/v1/question"
}
const parameters = {
    country: "",
    state: "country",
    city: "parent",
    department: "",
    designation: "department",
    zipcode: "country",
    language: "country",
    currency: "",
    "service-category": "",
    services: "parent",
    "project-type": "",
    industry: "",
    client: "category.isClient",
    vendor: "category.isVendor",
    tax: "parent",
    user:"",
    roles:"",
    category:"",
    question:""
}
const populate = {
    category: val=>({label:val.name,value:val.name}),
    default: val => ({ value: val.name, label: val.label }),
    country: val => ({ value: val.name, label: val.label,img:`/images/flags/${val.name.toLowerCase()}.svg` }),
    roles: val=>({value:val.name,label:val.name})
}
export default async function getOptions(field, parameter = null, populateFn = null) {
    if (!field || !(field in endpoints)) return null;
    if (parameters[field] !== "" && (parameter === null || parameter === "")) return null;
    const cacheKey = btoa(`${field}_${parameter ?? ""}`);
    let temp = window.localStorage.getItem(cacheKey);
    if (true) {
        temp = await updateOption(field, parameter, cacheKey)
    } else {
        updateOption(field, parameter, cacheKey)
    }
    let populateFunction = populate.default;
    if (populate[field]) populateFunction = populate[field];
    if (!!populateFn) populateFunction = populateFn;
    return JSON.parse(temp).map(populateFunction);
}

async function updateOption(field, parameter, cacheKey) {
    let temp;
    switch ((parameters[field] === "") ? "get" : "post") {
        case "get":
            temp = await api.get(endpoints[field]);
            break;
        case "post":
            temp = await api.post(endpoints[field], {
                [parameters[field]]: parameter
            })
            break;
    }
    if (temp.status === "success" && ("data" in temp)) temp = JSON.stringify(temp.data);
    localStorage.setItem(cacheKey, temp)
    return temp;
}