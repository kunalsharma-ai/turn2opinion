import express from "express";
const app=express.Router();
/* import fetch from "node-fetch";
const contexts = {}; // store context in memory (replace with Redis or DB for persistence)

app.get("/", async (req, res) => {
  const { category, responses, contextId } = req.body;

  const context = contexts[contextId] || [];

  const prompt = `
You are an AI medical interviewer. Based on the medical professional questionnaire, generate a complete profile as JSON.
The response should include all key fields, inferred values where missing, and follow conditional logic.
Use this structure:
{
  "category": "medical professional",
  "profile": {
     "basic": {
        "name":"Text",
        "email":"EMail",
        "phone":"tel",
        "gender":[],
     },
     "education": {...},
     "specialization": {...},
     "jobDetails": {...},
     "health": {...},
  }
}
Here are the known responses so far:
${JSON.stringify(responses, null, 2)}
`;

  const result = await fetch("https://mho.sampledge.duckdns.org/ai/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma3",
      prompt,
      context: context,
      stream: false // full output in one go
    }),
  });

  const data = await result.json();
console.log(data);
  // store context for follow-up
  contexts[contextId] = data.context;

  res.json({
    message: "Profile generated",
    profile: data.response,
    contextId,
  });
});

// ------------------ REFINE EXISTING PROFILE ------------------
app.post("/refine-profile", async (req, res) => {
  const { contextId, newQuery } = req.body;
  const context = contexts[contextId];

  if (!context) return res.status(404).json({ error: "Invalid contextId" });

  const prompt = `
Based on the previous context, update or refine the existing profile.
User says: "${newQuery}"
Return only the updated JSON.
`;

  const result = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt,
      context,
      stream: false
    }),
  });

  const data = await result.json();
  contexts[contextId] = data.context; // update context memory

  res.json({ message: "Profile refined", profile: data.response });
});
//*/
export default app;