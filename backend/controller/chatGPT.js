const { GoogleGenerativeAI } = require("@google/generative-ai");
const chatGPT = async (req, res) => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCtRcAoPGya54e_heZkqj78EcYs6CoouZY"
  );

  const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function run() {
    const prompt = req.body.initalPrompt;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  }

  run();
};

module.exports = chatGPT;
