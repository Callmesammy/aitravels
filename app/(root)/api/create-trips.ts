import { z } from "zod";
import { formSchema } from "../trips/page";
import { GoogleGenAI } from "@google/genai";

export const action = async (formdata: z.infer<typeof formSchema>) => {
  const data = formSchema.parse(formdata);
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GERMINI_API_KEY! });

  const unsplashKey = process.env.NEXT_PUBLIC_UPSPLASH_API!;

  try {
    const prompt = `
      Generate a ${data.duration}-day itinerary for ${data.country} based on:
      Budget: ${data.budget}
      Travel: ${data.travel}
      Group: ${data.group}
      Interest: ${data.interest}

      Return structured JSON like:
      {
        "name": "Trip Title",
        "description": "Trip summary",
        "estimatedPrice": "USD price",
        "duration": "${data.duration}",
        "budget": "${data.budget}",
        "country": "${data.country}",
        "group": "${data.group}",
        "interest": "${data.interest}",
        "travel": "${data.travel}",
        "bestTimeToVisit": [...],
        "location": {
          "city": "...",
          "coordinates": [lat, lng],
          "openStreetMap": "..."
        },
        "itinerary": {
          "Day 1": "Activity 1",
          "Day 2": "Activity 2"
        }
      }
    `; 

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", 
      contents: prompt
    })

    const reText = response.candidates?.[0]
    const fwText = reText?.content?.parts?.[0].text || ""

    const rwText = fwText.replace(/```json|```/g, "").trim()

    let json
    try{
      json = JSON.parse(rwText)
    }catch(err){
      console.error("something went wrong", err)
      console.log("Germini Api Error", fwText)
    }

// 🖼️ Unsplash fetch
const unsplashUrl = `https://api.unsplash.com/search/photos?query=${data.country}+${data.interest}+${data.travel}&client_id=${unsplashKey}`;
const imgRes = await fetch(unsplashUrl);
const imgData = await imgRes.json();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image = imgData.results?.slice(0, 3).map((img: any)=> img.urls?.regular) || [];

    return {
      ...json,
      image,
    };

    
  } catch (error) {
    console.error("AI itinerary error:", error);
    return null;
  }
};
