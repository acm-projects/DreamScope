// Change this line to access dreamText or dreamFragments attribute in DreamPost table
// const submitIcon = document.querySelector("#submit-icon"); // MODIFY THIS LINE
// const inputElement = document.querySelector("#dream-input"); // MODIFY THIS LINE

// Hardcoded test prompt for CLI testing
// const testPrompt = `
// I found myself in a haunted mansion alone. I went to each room in this mansion,
// and I tried to find other people. But partway through, I found a room with a wardrobe,
// and when I opened the wardrobe, the ghost of a woman in a bloodied wedding dress locked
// eyes with me and chased me. I got super scared and I ran all the way across the mansion
// to try and escape her. I ran into a room and locked the door behind me and held my breath
// until I was sure I was safe. Then, I explored the room I was in and found a music box with
// the sound of a baby's laughter in it. I immediately got creeped out by the laugh, and it
// scared me so bad that I woke up.
// `;

const getSubpromptsFromChatGPT = async (rawPrompt) => {
    const chatOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Split the input text into 4 separate paragraphs of roughly equal length. No more than 30 words in each paragraph. Each paragraph should be delimited by -- and be descriptive enough to generate a DALL·E 3 image from. Keep each one imaginative and vivid with a focus on the background setting and characters.",
          },
          {
            role: "user",
            content: rawPrompt,
          },
        ],
      }),
    };
  
    try {
      const res = await fetch(
        "https://api.openai.com/v1/chat/completions",
        chatOptions
      );
      const data = await res.json();
      const fullSplitPrompt = data.choices[0].message.content;
      const subprompts = fullSplitPrompt
        .split("--")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
  
      return subprompts.slice(0, 4);
    } catch (error) {
      console.error("Error getting subprompts from ChatGPT:", error);
      return [];
    }
  };
  
  const generateImageFromPrompt = async (promptText, index) => {
    const imageOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: promptText,
        n: 1,
        size: "1024x1024",
      }),
    };
  
    try {
      const res = await fetch(
        "https://api.openai.com/v1/images/generations",
        imageOptions
      );
      const data = await res.json();
      const imageUrl = data.data[0].url;
  
      console.log(`Image ${index + 1} URL: ${imageUrl}`);
      return imageUrl;
    } catch (error) {
      console.error(`Error generating image ${index + 1}:`, error);
    }
  };
  
  const getImages = async (dreamText) => {
    // Step 1: Get subprompts from ChatGPT
    const subprompts = await getSubpromptsFromChatGPT(dreamText);
  
    // Step 2: Ensure there are subprompts to process
    if (subprompts.length === 0) {
      console.log("No subprompts generated.");
      return [];
    }
  
    // Step 3: Generate images for each subprompt
    const imageUrls = [];
  
    // Loop through each subprompt and generate an image
    for (let i = 0; i < subprompts.length; i++) {
      const imageUrl = await generateImageFromPrompt(subprompts[i], i);
      if (imageUrl) {
        imageUrls.push(imageUrl); // Add the generated image URL to the array
      }
    }
  
    // Return all generated image URLs
    return imageUrls;
  };
  
  export default getImages;
  
  // submitIcon.addEventListener("click", getImages); // MODIFY THIS LINE?