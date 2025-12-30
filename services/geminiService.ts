
import { GoogleGenAI } from "@google/genai";

export const generateGreeting = async () => {
  // Always use the API key directly from process.env.API_KEY per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "作为一名充满创意的祝福设计师，为2026马年生成一条短小但极具感染力、充满童趣与温情的春节祝福语。语调要轻快、亮眼，适合发给任何年龄段（学生、老师或朋友）。确保包含'马年'相关元素。仅限1-2句中文。",
      config: {
        temperature: 0.9,
        topP: 0.9,
      }
    });
    return response.text || "愿你在马年里，像踩在星河上的小马，每一步都踏出快乐的火花！";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "龙马精神，岁岁平安！愿你新的一年里，如骏马奔腾，前程万里！";
  }
};
