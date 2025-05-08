"use server"
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/utils/supabase/server";
import { formSchema } from "@/lib/validation/trips";

export const action = async (formdata: z.infer<typeof formSchema>) => {
  const dat = {
    country: formdata.country,
    duration:  formdata.duration,
    travel:  formdata.travel,
    group:  formdata.group,
    interest:  formdata.interest,
    budget:  formdata.budget,
  }
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GERMINI_API_KEY! });

  const unsplashKey = process.env.NEXT_PUBLIC_UPSPLASH_API!;

  try {
    const prompt = `
      Generate a ${dat.duration}-day itinerary for ${dat.country} based on:
      Budget: ${dat.budget}
      Travel: ${dat.travel}
      Group: ${dat.group}
      Interest: ${dat.interest}
      

      Return structured JSON like:
      {
        "name": "Trip Title",
        "description": "Trip summary",
        "estimatedPrice": "NGN price",
        "duration": "${dat.duration}",
        "budget": "${dat.budget}",
        "country": "${dat.country}",
        "group": "${dat.group}",
        "interest": "${dat.interest}",
        "travel": "${dat.travel}",
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
const unsplashUrl = `https://api.unsplash.com/search/photos?query=${dat.country}+${dat.interest}+${dat.travel}&client_id=${unsplashKey}`;
const imgRes = await fetch(unsplashUrl);
const imgData = await imgRes.json();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image = imgData.results?.slice(0, 3).map((img: any)=> img.urls?.regular) || [];

    const supabase = await createClient(); 
    const {data, error} = await supabase.from("upload").insert({
      taskDetails: json, 
      imagUrl: image
    }).select("id").single()
    if(data){
      console.log(data)
    }else{
      console.error("something went wrong", error)
    }
    return {
      ...json,
      image,
      id: data?.id
    };
  } catch (error) {
    console.error("AI itinerary error:", error);
    return null;
  }
};
