const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
  const prompt = req.body.code;
  if (!prompt) {
    return res.status(400).send("Prompt is required");
  }
  const aiResponse = await aiService(prompt);
  res.send(aiResponse);
};
