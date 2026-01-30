import Alert from "@mui/material/Alert"
import React from "react";

export default function Error(attr){
    return(<Alert severity="error">{attr.message}</Alert>)
}