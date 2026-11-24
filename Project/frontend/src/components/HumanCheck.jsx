"use client";
// Human check for sign-up and login. The challenge comes from GET /api/v1/user/captcha and is checked on the
// server when the form is sent, once: a used or expired challenge is refused, so the form passes a new resetKey
// after every failed send and a fresh challenge loads. Typing never checks anything by itself.
//
// onChange gets null (nothing typed yet) or { id, answer }. Inside a plain <form>, the hidden captchaId field and
// the captchaAnswer box are sent as they are, so submitWithAjax needs no change.
import React, { useCallback, useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography, Button, CircularProgress } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function HumanCheck({ onChange, resetKey = 0 }) {
  const [mode, setMode] = useState("image");
  const [challenge, setChallenge] = useState(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (m) => {
    setLoading(true);
    setError("");
    setAnswer("");
    onChange?.(null);
    try {
      const r = await fetch(`/api/v1/user/captcha?mode=${m === "text" ? "text" : "image"}`, { credentials: "same-origin" });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j?.data?.id) throw new Error(j?.message || "Couldn't load the check.");
      setChallenge(j.data);
    } catch (e) {
      setChallenge(null);
      setError(e.message || "Couldn't load the check.");
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  useEffect(() => { load(mode); }, [mode, resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const type = (v) => {
    setAnswer(v);
    onChange?.(v.trim() && challenge ? { id: challenge.id, answer: v.trim() } : null);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography fontSize={14} fontWeight={600}>Quick check that you're a person</Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minHeight: 52 }}>
        {loading ? <CircularProgress size={20} /> : challenge?.mode === "image" ? (
          <img src={challenge.image} width={168} height={52} alt="A picture of 5 letters and numbers. If you can't read it, choose 'Answer a question instead'." style={{ borderRadius: 6, border: "1px solid #d9e1ed" }} />
        ) : challenge?.mode === "text" ? (
          <Typography fontSize={16} fontWeight={600}>{challenge.question}</Typography>
        ) : null}
        <IconButton aria-label="Get a new check" onClick={() => load(mode)} size="small" disabled={loading}><RefreshIcon fontSize="small" /></IconButton>
      </Box>
      {error ? <Typography color="error" fontSize={13}>{error} <Button size="small" onClick={() => load(mode)}>Try again</Button></Typography> : null}
      <input type="hidden" name="captchaId" value={challenge?.id || ""} />
      <TextField
        name="captchaAnswer"
        size="small"
        fullWidth
        autoComplete="off"
        value={answer}
        onChange={(e) => type(e.target.value)}
        label={challenge?.mode === "text" ? "Your answer" : "Type the code in the picture"}
        inputProps={{ maxLength: 10, spellCheck: false, autoCapitalize: "characters", "aria-describedby": "human-check-help" }}
      />
      <Button size="small" sx={{ alignSelf: "flex-start", textTransform: "none", p: 0 }} onClick={() => setMode(mode === "image" ? "text" : "image")}>
        {mode === "image" ? "Answer a question instead" : "Use a picture code instead"}
      </Button>
      <Typography id="human-check-help" fontSize={12} color="text.secondary">Each check works once. A new one appears if sign-in doesn't go through.</Typography>
    </Box>
  );
}
