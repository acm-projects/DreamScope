
import dotenv from 'dotenv';
import OpenAI from 'openai';
import DreamPost from './models/DreamPost.js';

// Load environment variables
dotenv.config();

// Initialize OpenAI Client
const openAI_api_key = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey: openAI_api_key });

async function analyzeDream(dreamText, themes = [], settings = [], emotions = []) {
  const context = "You are an expert dream analyst providing interpretations based on psychology, symbolism, and emotions, in simple everyday language.";
  let prompt = `Analyze this dream in paragraph format: ${dreamText}`;

 if (themes.length > 0) {
   prompt += ` Themes: ${themes.join(', ')}.`;
 }
 if (settings.length > 0) {
   prompt += ` Settings: ${settings.join(', ')}.`;
 }
 if (emotions.length > 0) {
   prompt += ` Emotions: ${emotions.join(', ')}.`;
 }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: context },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    console.log("yy: ", response);
    return response;
  } catch (error) {
    console.error("Error analyzing dream:", error);
    return "Sorry, I couldn't analyze your dream right now.";
  }
}



export default  analyzeDream ;