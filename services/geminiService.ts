import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";

let ai: GoogleGenAI | null = null;

if (process.env.API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
  console.warn("Gemini API Key is missing. AI features will be disabled or mocked.");
}

const MENU_CONTEXT = PRODUCTS.map(p => 
  `${p.name} (${p.category}): $${p.price}. ${p.description} Ingredients: ${p.isVegetarian ? 'Vegetarian' : 'Meat'}.`
).join('\n');

const SYSTEM_INSTRUCTION = `
You are "Chef Lavish", the AI culinary assistant for the Lavish Shawarma website.
Your goal is to help customers choose the best food from our menu.
Be friendly, appetizing, and brief.
The menu data is:
${MENU_CONTEXT}

If a user asks for recommendations, suggest specific items from the menu.
If they ask about ingredients, answer based on the menu description.
Keep answers under 3 sentences.
Use emojis occasionally 🌯 🔥.
`;

export const getChefRecommendation = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "I'm currently offline (API Key missing). But I recommend the Classic Chicken Shawarma!";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });
    
    return response.text || "Let's find you something delicious! Check out our menu.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the kitchen right now. Please browse our menu!";
  }
};
