const axios = require("axios");
require("dotenv").config();

const openaiApiKey = "sk-proj-Trbu9UNlsdwNmuyeRS4ET3BlbkFJ5veIop4WuQeHSySBPPcI";

const generateResponse = async (prompt) => {
  const url = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await axios.post(
      url,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are ChatGPT, a helpful assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );

    const choices = response.data.choices;
    if (choices && choices.length > 0) {
      return choices[0].message.content.trim();
    }
    return "No response generated";
  } catch (error) {
    console.error(
      "Error generating response:",
      error.response ? error.response.data : error.message
    );
    return "An error occurred while generating the response.";
  }
};

module.exports = generateResponse;
