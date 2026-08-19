"use client"
import { api } from "@/util";
import React from "react";

export default function page() {

    const [formData, setFormData] = React.useState({
        user:"6a22acff346562f30a2fda9b"
    });
    return (<>
        <input onChange={
            e => {
                setFormData({ ...formData, user: e.target.value })
            }
        } value={ formData.user ?? "" } type="text" />
        <input onChange={
            e => {
                setFormData({ ...formData, title: e.target.value })
            }
        } value={ formData.title ?? "" } type="text" />
        <input onChange={
            e => {
                setFormData({ ...formData, subtitle: e.target.value })
            }
        } value={ formData.subtitle ?? "" } type="text" />
        <input onChange={
            e => {
                setFormData({ ...formData, cta: e.target.value })
            }
        } value={ formData.cta ?? "" } type="text" />
        <input onChange={
            e => {
                setFormData({ ...formData, ctaType: e.target.value })
            }
        } value={ formData.ctaType ?? "" } type="text" />
        <button
            onClick={
                async e => {
                    let resp=await api.put(`/api/v1/alerts`,{
                        ...formData,
                        users:[formData.user]
                    });
                    console.log(resp)
                    console.log(formData);
                }
            }
        >Submit</button>
    </>)
}