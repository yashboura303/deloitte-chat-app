import React, { useState } from "react";
import "./App.css";
import { ReactComponent as DeloitteLogo } from "./assets/deloitte-logo.svg";
import ReactMarkdown from "react-markdown";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the prompt is tax-related
    if (!isTaxRelated(prompt)) {
      setResponse("Please limit your questions to tax-related topics only.");
      return;
    }

    setLoading(true);

    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/chat", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    // Setup request handlers
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const responseData = JSON.parse(xhr.responseText);
            setResponse(responseData.response);
            // Save response to local storage for history
            saveToHistory(prompt, responseData.response);
          } catch (error) {
            console.error("Error parsing response:", error);
            setResponse("Sorry, there was an error processing your request.");
          }
        } else {
          console.error("Server Error:", xhr.statusText);
          const errorData = JSON.parse(xhr.responseText);
          setResponse(`Error: ${errorData.error}\n${errorData.details || ""}`);
        }
        setLoading(false);
      }
    };

    // Setup error handler
    xhr.onerror = function () {
      console.error("Request Failed");
      setResponse("Sorry, there was a network error. Please try again.");
      setLoading(false);
    };

    // Send the request
    try {
      xhr.send(JSON.stringify({ prompt }));
    } catch (error) {
      console.error("Error sending request:", error);
      setResponse("Sorry, there was an error sending your request.");
      setLoading(false);
    }
  };

  // Function to check if prompt is tax-related
  const isTaxRelated = (text) => {
    const taxKeywords = [
      "tax",
      "deduction",
      "irs",
      "income",
      "filing",
      "return",
      "audit",
      "exemption",
      "credit",
      "liability",
      "revenue",
      "taxation",
      "taxpayer",
      "refund",
      "withholding",
    ];

    const lowerText = text.toLowerCase();
    return taxKeywords.some((keyword) => lowerText.includes(keyword));
  };

  // Function to save chat history to local storage
  const saveToHistory = (prompt, response) => {
    const history = JSON.parse(localStorage.getItem("taxChatHistory") || "[]");
    history.push({
      prompt,
      response,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("taxChatHistory", JSON.stringify(history));
  };

  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="header">
          <div className="title">Deloitte Auditor Enterprise Chat UI</div>
          <DeloitteLogo className="logo" />
        </div>

        <div className="prompt-section">
          <div className="prompt-label">Tax Prompt</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your tax-related question here..."
            className="prompt-input"
          />
        </div>

        <div className="button-section">
          <button
            className="send-button"
            onClick={handleSubmit}
            disabled={loading || !prompt.trim()}
          >
            {loading ? "Processing..." : "Send"}
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setPrompt("");
              setResponse("");
            }}
          >
            Cancel
          </button>
        </div>

        <div className="response-section">
          <div className="response-label">Response</div>
          <div className="response-content">
            {loading ? (
              "Loading..."
            ) : (
              <ReactMarkdown className="markdown-content">
                {response}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
