"use client";
import React from "react";

import { Grid, Divider, Typography, Box } from "@mui/material";

export default function DataList({ dataList, title }) {
  const filteredList = (dataList || []).filter(
    (item) =>
      item.value !== null && item.value !== undefined && item.value !== ""
  );

  return (
    <>
      {filteredList?.length > 0 && (
        <Grid size={12} sx={{ p: 2 }}>
          {title && (
            <Typography sx={{ fontWeight: "bold", fontSize: "18px", mb: 2 }}>
              {title}
            </Typography>
          )}
          <Grid size={12} container sx={{ px: { xs: 0.5, md: 2 } }}>
            {filteredList.map((item, index, array) => (
              <React.Fragment key={index}>
                <Grid
                  container
                  size={12}
                  sx={{
                    border: 1,
                    borderColor: "transparent",
                    "&:hover": {
                      bgcolor: "#f9f9f9",
                      borderRadius: 1,
                      borderColor: "#e0e0e0",
                    },
                    py: 0.6,
                  }}
                >
                  <Grid
                    size={{
                      xs: 12,
                      md: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",

                        ml: { xs: 0, md: 3 },
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Grid>
                  <Grid
                    size={{
                      xs: 12,
                      md: 8,
                    }}
                  >
                    <Box fontWeight={500}>{item.value}</Box>
                  </Grid>
                </Grid>
                {index !== array.length - 1 && (
                  <Divider sx={{ width: "100%" }} />
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
}
