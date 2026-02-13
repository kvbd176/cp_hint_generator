import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// Update this URL to your local LLM endpoint
const LOCAL_LLM_URL = "http://127.0.0.1:7860/queue/join?";

// Helper to generate level-based hints
function getHintPrompt(problem, level) {
  switch (level) {
    case 1:
      return `You are a competitive programming mentor.\nProblem:\n${problem}\nGive a subtle hint that requires some thought.`;
    case 2:
      return `You are a competitive programming mentor.\nProblem:\n${problem}\nGive a clearer hint, easier to understand than Hint 1.`;
    case 3:
      return `You are a competitive programming mentor.\nProblem:\n${problem}\nGive a detailed hint, almost a complete solution but not the full code.`;
    default:
      return `You are a competitive programming mentor.\nProblem:\n${problem}\nGive a helpful hint.`;
  }
}

// Generate code prompt
function getCodePrompt(problem, language) {
  return `You are an expert competitive programmer.\nProblem:\n${problem}\nGenerate complete ${language} code.`;
}

app.post("/generate", async (req, res) => {
  try {
    const { problem, step, language = "python", level } = req.body;

    if (!problem || !step) {
      return res.json({ result: "Invalid request: problem text or step missing." });
    }

    let prompt = "";
    if (step === "hint") {
      prompt = getHintPrompt(problem, level || 1);
    } else if (step === "code") {
      prompt = getCodePrompt(problem, language);
    } else {
      return res.json({ result: "Invalid step value. Must be 'hint' or 'code'." });
    }

    // Send request to local LLM
    const response = await axios.post(LOCAL_LLM_URL, {
      fn_index: 0,
      data: [prompt],
      event_data: null,
      session_hash: "test123"
    });

    // Extract generated text
    const result = response.data?.data?.[0]?.generated_text || "No response from local model.";
    res.json({ result });

  } catch (err) {
    console.error("Server error:", err.message);
    res.json({ result: "Error generating response: " + err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
