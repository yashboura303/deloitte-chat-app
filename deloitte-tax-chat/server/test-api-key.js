const fetch = require("node-fetch");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
  console.error("Error: API key not set in .env file");
  console.log(
    "Please update your .env file with a valid Gemini API key from https://makersuite.google.com/app/apikey"
  );
  process.exit(1);
}

console.log("Testing Gemini API key...");
console.log("Using API key:", apiKey);

async function testApiKey() {
  try {
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
                  text: "Hello, can you tell me about tax deductions?",
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("✅ API key is valid!");
      console.log("Sample response:");
      console.log(
        data.candidates[0].content.parts[0].text.substring(0, 100) + "..."
      );
    } else {
      console.error("❌ API key is not valid or there's an API error");
      console.error("Error details:", data.error);
    }
  } catch (error) {
    console.error("❌ Error testing API key:", error.message);
  }
}

testApiKey();
