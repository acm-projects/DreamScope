import dotenv from 'dotenv';

import OpenAI from 'openai';



dotenv.config();
const openAI_api_key = process.env.OPENAI_API_KEY;

const client = new OpenAI({ apiKey: openAI_api_key });



async function analyzeDream(dreamText, selectedThemes = [], selectedSettings = [], selectedEmotions = [], recurringPlaces = [], recurringObjects = [], recurringPeople = [], recurringThemes = [], weeklyCheckIn = []) {

const context = `You are an expert dream analyst. Analyze the dream in a concise paragraph format, providing interpretations based on psychology, symbolism, and emotions, using simple everyday language.



After the analysis paragraph, please identify and list the following from the dream as separate bulleted lists in this format only:

- People mentioned

- Objects mentioned

- Places mentioned

- Themes present




if there are life updates provided, take them into account for interpretations.`;



let prompt = `Here is the dream: ${dreamText}`;



if (selectedThemes.length > 0) {

prompt += `\nUser-selected themes: ${selectedThemes.join(', ')}.`;

}

if (selectedSettings.length > 0) {

prompt += `\nUser-selected settings: ${selectedSettings.join(', ')}.`;

}

if (selectedEmotions.length > 0) {

prompt += `\nUser-selected emotions: ${selectedEmotions.join(', ')}.`;

}



if(weeklyCheckIn.length > 0)

{

prompt += `\nRecent life updates of user: ${weeklyCheckIn.join(', ')}.`

}



let recurringContext = "";

if (recurringPlaces.length > 0) {

recurringContext += `Recurring Places: ${recurringPlaces.join(', ')}. `;

}

if (recurringObjects.length > 0) {

recurringContext += `Recurring Objects: ${recurringObjects.join(', ')}. `;

}

if (recurringPeople.length > 0) {

recurringContext += `Recurring People: ${recurringPeople.join(', ')}. `;

}

if (recurringThemes.length > 0) {

recurringContext += `Recurring Themes: ${recurringThemes.join(', ')}. `;

}



if (recurringContext) {

prompt += `\n\nConsider these recurring elements from past dreams in your analysis: ${recurringContext}`;

}





try {

const completion = await client.chat.completions.create({

model: "gpt-4-turbo",

messages: [

{ role: "system", content: context },

{ role: "user", content: prompt },

],

max_tokens: 750,

});



const response = completion.choices[0].message.content;

console.log("AI Response: ", response);




const entities = {

analysis: extractAnalysis(response),

people: extractEntities(response, "People mentioned:"),

objects: extractEntities(response, "Objects mentioned:"),

places: extractEntities(response, "Places mentioned:"),

themes: extractEntities(response, "Themes present:"),

};

console.log("after changing: people = ", entities.people);

console.log("after changing: objects = ", entities.objects);

console.log("after changing: places = ", entities.places);

console.log("after changing: themes = ", entities.themes);

return entities;



} catch (error) {

console.error("Error analyzing dream:", error);

return {

analysis: "Sorry, I couldn't analyze your dream right now.",

people: [],

objects: [],

places: [],

themes: [],

};

}

}



function extractEntities(text, label) {

const startIndex = text.indexOf(label);

if (startIndex === -1) {

return [];

}

const endIndex = text.indexOf("\n\n", startIndex);

const listText = endIndex === -1 ? text.substring(startIndex + label.length).trim() : text.substring(startIndex + label.length, endIndex).trim();

return listText.split('\n').map(item => item.replace(/^-\s*/, '').trim()).filter(item => item !== '');

}



function extractAnalysis(text) {

const peopleIndex = text.indexOf("People mentioned:");

if (peopleIndex !== -1) {

return text.substring(0, peopleIndex).trim();

}

return text.trim();

}



export default analyzeDream;