const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Renamed for clarity
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"; // Renamed for clarity

console.log("API Key Loaded:", OPENROUTER_API_KEY || "Not found");

app.use(express.json());
app.use(cors());

app.post("/api/query", async (req, res) => {
  const { prompt } = req.body;

  // Validate input
  if (!prompt || typeof prompt !== "string") {
    console.error("Invalid prompt:", prompt);
    return res
      .status(400)
      .json({ error: "Prompt is required and must be a string" });
  }

  // Check API key before making the request
  if (!OPENROUTER_API_KEY) {
    console.error("API key not configured");
    return res
      .status(500)
      .json({ error: "Server configuration error: API key missing" });
  }

  try {
    console.log("Sending request with prompt:", prompt);
    const response = await axios.post(
      OPENROUTER_URL,
      {
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response received:", response.data);
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error(
      "OpenRouter API Error:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
