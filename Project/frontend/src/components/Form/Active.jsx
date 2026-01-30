import React from "react";
import { Select, MenuItem } from "@mui/material";

export default function Active({ info, api, LoadData, endpoint,disabled=false }) {
  return (
    <Select
      value={info.isActive}
      disabled={disabled}
      onChange={async (e) => {
        await api.put(`${endpoint}${info._id}`, {
          isActive: e.target.value,
        });
        await LoadData();
      }}
      notched={false}
      inputProps={{ "aria-label": "active status" }}
      size="small"
      MenuProps={{
        PaperProps: {
          sx: {
            padding: 0,
            marginTop: 0.5,
            borderRadius: 2,
            boxShadow: "none",
            border: "none",
            "& .MuiList-root": {
              padding: 0,
            },
          },
        },
      }}
      sx={{
        minWidth: "90px",
        backgroundColor: info.isActive ? "#b6f0b6" : "#f4b6b6",
        color: info.isActive ? "#184e18ff" : "#4e0e0eff",
        borderColor: info.isActive ? "#184e18ff" : "#4e0e0eff",
        "& .MuiSelect-select": {
          padding: "4px",
          fontSize: "12px !important",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        height: "24px",
      }}
    >
      <MenuItem
        value="true"
        sx={{
          backgroundColor: "#b6f0b6",
          color: "#184e18ff",
          fontSize: "12px !important",
          pl: 2,
          minHeight: "24px",
          textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",

          "&:hover": {
            backgroundColor: "#b6f0b6 !important",
            color: "#184e18ff",
          },
          "&.Mui-selected": {
            backgroundColor: "#b6f0b6 !important",
            color: "#184e18ff",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#b6f0b6 !important",
            color: "#184e18ff",
          },
        }}
      >
        Active
      </MenuItem>
      <MenuItem
        value="false"
        sx={{
          backgroundColor: "#f4b6b6",
          color: "#4e0e0eff",
          fontSize: "12px !important",
          pl: 2,
          minHeight: "24px",
          textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",

          "&:hover": {
            backgroundColor: "#f4b6b6 !important",
            color: "#4e0e0eff",
          },
          "&.Mui-selected": {
            backgroundColor: "#f4b6b6 !important",
            color: "#4e0e0eff",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#f4b6b6 !important",
            color: "#4e0e0eff",
          },
        }}
      >
        Inactive
      </MenuItem>
    </Select>
  );
}
