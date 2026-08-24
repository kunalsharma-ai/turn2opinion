"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Rating,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";

export default function FeedbackForm({ onClose }) {
  const [form, setForm] = useState({
    rating: 5,
    feedback: "",
    recommend: "Yes",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mx: "auto",
        p: { xs: 3, md: 3 },
        bgcolor: "background.paper",
        position: "relative",
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "grey",
          "&:hover": { color: "error.light" },
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h4" fontWeight={700}>
        We'd Love Your Feedback
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Help us improve your experience by sharing your thoughts, suggestions,
        or reporting any issues you've encountered.
      </Typography>

      <Stack spacing={2} mb={2}>
        <TextField
          label="Feedback"
          name="feedback"
          value={form.feedback}
          onChange={handleChange}
          multiline
          rows={5}
          fullWidth
          placeholder="Tell us what you liked, what could be improved, or describe any issues you experienced..."
        />

        <Box>
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            Overall Experience
          </Typography>

          <Rating
            size="large"
            value={form.rating}
            onChange={(_, value) =>
              setForm((prev) => ({
                ...prev,
                rating: value,
              }))
            }
          />
        </Box>

        <Box>
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            Would you recommend us?
          </Typography>

          <RadioGroup
            row
            name="recommend"
            value={form.recommend}
            onChange={handleChange}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        <Button
          onClick={() => {
            alert(JSON.stringify(form, null, 2));
          }}
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          endIcon={<SendIcon />}
          sx={{
            alignSelf: "flex-start",
            px: 5,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Submit Feedback
        </Button>
      </Stack>
    </Paper>
  );
}
