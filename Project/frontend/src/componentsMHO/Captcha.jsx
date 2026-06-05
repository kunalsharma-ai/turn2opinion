"use client";
import React from "react";
import { api, Page } from "@/util";
import { IconButton } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import { useToast } from "@/hooks";

export default function Captcha({ onVerified }) {
  const [counter, setCounter] = React.useState(1);
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  function resetCaptcha() {
    setCounter(counter + 1);
    setCode("");
  }
  return (
    <>
      <Page.Box sx={{ width: "100%" }}>
        <Page.Box
          gap={2}
          mb={0.2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img
            src={`/captcha?${counter}`}
            alt="Captcha"
            // width="240px"
            height="60px"
          />
          <IconButton
            onClick={(e) => {
              resetCaptcha();
            }}
          >
            <LoopIcon />
          </IconButton>
        </Page.Box>

        <Page.Box display="flex" gap={2} alignItems="center">
          <Page.Box sx={{ flex: 1 }}>
            <Page.InputTextField
              fullWidth
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              // error={true}
              // helperText="Error Text"
              sx={{
                "& .MuiFormHelperText-root": {
                  fontSize: "13px",
                  fontWeight: "bold",
                },
              }}
            />
          </Page.Box>
          <Page.MuiButton
            variant="contained"
            disabled={code.length !== 6}
            loading={isLoading}
            color="primary"
            sx={{
              fontWeight: 600,
            }}
            onClick={async (e) => {
              setIsLoading(true);
              try {
                let temp = await api.post(`/captcha`, { code });
                useToast(temp);
                switch (temp.status) {
                  case "error":
                    resetCaptcha();
                    break;
                  case "success":
                    if (!!onVerified) onVerified();
                    setIsLoading(false);
                    break;
                }
              } catch (error) {
              } finally {
                setIsLoading(false);
              }
            }}
          >
            Verify
          </Page.MuiButton>
        </Page.Box>
        <Page.Text
          // mt={1}
          sx={{
            color: "text.secondary",
            fontSize: "12px",
          }}
        >
          Please fill the above to verify you are not a robot
        </Page.Text>
      </Page.Box>
    </>
  );
}
