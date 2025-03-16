const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// Import node-fetch for Node.js versions before 18
const fetch = require("node-fetch");

// Load environment variables
dotenv.config();

// Verify API key is loaded
const apiKey =
  process.env.GEMINI_API_KEY || "AIzaSyCdzkk8VvIXYACTK1O4rXAvE-JSxTyV5N8";
console.log(
  "API Key loaded:",
  apiKey ? "Yes (length: " + apiKey.length + ")" : "No"
);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Tax-related prompt engineering
const createTaxPrompt = (userPrompt) => {
  return `You are a Deloitte tax expert assistant. Please provide accurate, professional advice on the following tax-related question. Focus only on tax information and regulations. If the question is not tax-related, politely redirect the conversation to tax topics.

Question: ${userPrompt}

Please provide a detailed, well-structured response with references to relevant tax codes or regulations where applicable. If appropriate, mention potential tax deductions, credits, or strategies that might benefit the client.`;
};

// API endpoint for chat
app.post("/api/chat", async (req, res) => {
  try {
    console.log("Received chat request:", req.body);

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Check if API key is available
    if (!apiKey) {
      return res.status(500).json({
        error: "API key not configured",
        details: "Please set the GEMINI_API_KEY in your .env file",
      });
    }

    const taxPrompt = createTaxPrompt(prompt);
    console.log("Sending request to Gemini API...");

    // Forward the request to Gemini API - using gemini-1.5-flash model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: taxPrompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini API response status:", response.status);

    if (!response.ok) {
      console.error("Gemini API error:", data);
      throw new Error(data.error?.message || `API error: ${response.status}`);
    }

    if (data.error) {
      throw new Error(data.error.message || "Error from Gemini API");
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    res.json({ response: generatedText });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "An error occurred while processing your request",
      details: error.message,
    });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
