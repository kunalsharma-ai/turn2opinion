import React from "react";
import { Input, Phone, Select } from ".";

export default function Field({type,...attr}){
    switch (type) {
        case "select":
            return <Select {...attr} />
            break;
        case "phone":
            return <Phone {...attr}/>
            break;
        default:
            return <Input {...attr}/>
            break;
    }
}