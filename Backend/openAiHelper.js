import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();
const openAI_api_key = process.env.OPENAI_API_KEY;
const client = new OpenAI({ apiKey: openAI_api_key });


async function analyzeDream(dreamText, selectedThemes = [], selectedSettings = [], selectedEmotions = [], recurringPlaces = [], recurringObjects = [], recurringPeople = [], recurringThemes = [], weeklyCheckIn = []) {
    const context = `You are an expert dream analyst. Analyze the dream in a concise paragraph format, providing interpretations based on psychology, symbolism, and emotions, using simple everyday language.

                    After the analysis paragraph, please identify and list the following from the dream as separate bulleted lists in this format only:
                    - People mentioned:
                    - Objects mentioned:
                    - Places mentioned:
                    - Themes present:

                    Compare using what is provided for recurring people, objects, places, or themes mentioned, and add to it what might recur. List the updated list of recurring people, objects, places, or themes as separate bulleted lists in this format only:
                    - Recurring People:
                    - Recurring Objects:
                    - Recurring Places:
                    - Recurring Themes:
                    
                    If nothing is provided, add items from this dream to its respective list. Do not add anything in parentheses. Do not add any titles or sub headings of any sort. After the list of themes present, make sure the next thing is the list of recurring people.
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
    if (weeklyCheckIn.length > 0) {
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
            messages: [{ role: "system", content: context },
            { role: "user", content: prompt },],
            max_tokens: 750,
        });

        const response = completion.choices[0].message.content;
        console.log("AI Response: ", response);

        const entities = {
            analysis: extractAnalysis(response),
            people: extractEntities(response, "- People mentioned"),
            objects: extractEntities(response, "- Objects mentioned"),
            places: extractEntities(response, "- Places mentioned"),
            themes: extractEntities(response, "- Themes present"),

            recurringPpl: extractEntities(response, "Recurring People:"),
            recurringObj: extractEntities(response, "Recurring Objects:"),
            recurringPla: extractEntities(response, "Recurring Places:"),
            recurringThem: extractEntities(response, "Recurring Themes:"),
        };

        console.log("after changing: people = ", entities.people);
        console.log("after changing: objects = ", entities.objects);
        console.log("after changing: places = ", entities.places);
        console.log("after changing: themes = ", entities.themes);
        console.log("after changing: people = ", entities.recurringPpl);
        console.log("after changing: objects = ", entities.recurringObj);
        console.log("after changing: places = ", entities.recurringPla);
        console.log("after changing: themes = ", entities.recurringThem);
        return entities;
    } catch (error) {
        console.error("Error analyzing dream:", error);
        return {

            analysis: "Sorry, I couldn't analyze your dream right now.",
            people: [],
            objects: [],
            places: [],
            themes: [],
            recurringPeople: [],
            recurringObjects: [],
            recurringPlaces: [],
            recurringThemes: [],
        };
    }

}

function extractEntities(text, label) {
    const startIndex = text.indexOf(label);
    if (startIndex === -1) {
        return [];
    }

    const startOfList = startIndex + label.length;
    let endOfList = text.length; // Default to the end of the text

    const nextLabels = [
        "\n- People mentioned",
        "\n- Objects mentioned",
        "\n- Places mentioned",
        "\n- Themes present",
        "\n- Recurring People",
        "\n- Recurring Objects",
        "\n- Recurring Places",
        "\n- Recurring Themes"
    ];

    for (const nextLabel of nextLabels) {
        const nextIndex = text.indexOf(nextLabel, startOfList);
        if (nextIndex !== -1) {
            endOfList = nextIndex;
            break;
        }
    }

    const listText = text.substring(startOfList, endOfList).trim();
    return listText.split('\n')
        .map(item => item.replace(/^/, '').trim())
        .filter(item => item !== '');
}

function extractAnalysis(text) {
    const peopleIndex = text.indexOf("- People mentioned:");
    if (peopleIndex !== -1) {
        return text.substring(0, peopleIndex).trim();
    }
    return text.trim();
}


export default analyzeDream; 