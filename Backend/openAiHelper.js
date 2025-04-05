
import dotenv from 'dotenv';
import OpenAI from 'openai';
import DreamPost from './models/DreamPost.js';
import {useUser} from "../app/context/UserContext.js"

// Load environment variables
dotenv.config();

// Initialize OpenAI Client
const openAI_api_key = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey: openAI_api_key });

async function analyzeDream(dreamText, themes = [], settings = [], emotions = [], recurringPlaces = [], recurringObjects = [], recurringPeople = [], recurringThemes = [],) {
  const context = "You are a dream analyzer, providing interpretations based on psychology, symbolism, and emotions, in simple everyday language. ";
  let prompt = `Analyze this dream in paragraph format. Based on the recurring people, places, themes, and objects provided, if something matches add it to the list and display it. If there are none provided, add the ones in this dream for later use. Look for anything said about places, objects, themes, and people in this dream and display them seperately. Here is the dream: ${dreamText}`;

 if (themes.length > 0) {
   prompt += ` Themes: ${themes.join(', ')}.`;
 }
 if (settings.length > 0) {
   prompt += ` Settings: ${settings.join(', ')}.`;
 }
 if (emotions.length > 0) {
   prompt += ` Emotions: ${emotions.join(', ')}.`;
 }

 if (recurringPlaces.length > 0) {
  recurringPlaces += ` Recurring Places: ${recurringPlaces.join(', ')}.`;
}
if (recurringObjects.length > 0) {
  recurringPlaces += ` Recurring Objects: ${recurringPlaces.join(', ')}.`;
}
if (recurringPeople.length > 0) {
  recurringPlaces += ` Recurring People: ${recurringPlaces.join(', ')}.`;
}
if (recurringThemes.length > 0) {
  recurringPlaces += ` Recurring Themes: ${recurringPlaces.join(', ')}.`;
}

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: context },
        { role: "user", content: prompt },
        { role: "user", content: recurringPlaces},
        { role: "user", content: recurringObjects},
        { role: "user", content: recurringPeople},
        { role: "user", content: recurringThemes},
      ],
      max_tokens: 500,
    });
    const response = completion.choices[0].message.content;
    return response;
  } catch (error) {
    console.error("Error analyzing dream:", error);
    return "Sorry, I couldn't analyze your dream right now.";
  }
}



export default  analyzeDream ;